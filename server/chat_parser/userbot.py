from pyrogram import Client, types, filters, raw, enums
import asyncio, os, re, string, random, datetime
from config import BOT_TOKEN, ADMIN, DOMAIN
from orm import User, Chanel, Secrets, session

app = Client(
    "account",
    api_id=24875030,
    api_hash="4b33e79d62ce82c073687b0b026cc671"
)

@app.on_message()
async def handle_message(app: Client, message: types.Message):
    if not os.path.exists(f"uploads/{message.from_user.id}.jpg"):
        file_path = None
        if message.from_user.photo:
            await app.download_media(message.from_user.photo.big_file_id, f"uploads/{message.from_user.id}.jpg")
            file_path = f"uploads/{message.from_user.id}.jpg"
    else:
        file_path = f"uploads/{message.from_user.id}.jpg"

    user: User = session.query(User).filter(User.id_telegram == message.from_user.id).first()
    if not user:
        user = User(
            id_telegram=message.from_user.id,
            link_image=file_path,
            user_name=message.from_user.username,
            is_premium=message.from_user.is_premium
        )
        session.add(user)
        session.commit()

    if re.fullmatch(r'[\.!]?[\s]?сайт', message.text, re.I) and message.chat.id == message.from_user.id:
        secret = ''.join([random.choice(string.ascii_letters + string.digits) for r in range(6)])
        url = f'{DOMAIN}/auth?secret={secret}'
        session.add(Secrets(
            token=secret,
            telegram_id=message.from_user.id
        ))
        session.commit()
        await message.reply(f'Перейдите на {url} сайт для авторизации!')

@app.on_raw_update()
async def handle_chat_member(app: Client, event, data: dict, details: dict):
    if isinstance(event, raw.types.UpdateChannel):
        channel_id = int(f"-100{event.channel_id}")
        chanel: raw.types.Channel = details.get(event.channel_id)

        if isinstance(chanel, raw.types.ChannelForbidden):
            is_join = False  # Устанавливаем значение для заблокированного канала
        else:
            is_join = not chanel.left

        if hasattr(chanel, 'admin_rights') and chanel.admin_rights:
            owner: types.ChatMember
            try:
                async for member in app.get_chat_members(channel_id):
                    if member.status == enums.ChatMemberStatus.OWNER:
                        owner: types.User = member.user
            except:
                return

            verified = chanel.verified

            await asyncio.sleep(3)
            await app.send_message(ADMIN, f'Аккаунт присоединился к каналу <a href="{chanel.username if chanel.username else ""}">{chanel.title}</a>!')

            if chanel.username:
                invite_url = 'https://t.me/' + chanel.username
            else:
                try:
                    invite_url = await app.create_chat_invite_link(channel_id, name=DOMAIN)
                    invite_url = invite_url.invite_link
                except:
                    async for u in app.get_chat_admin_invite_links(channel_id, limit=1):
                        invite_url = u.invite_link

            link_Type_Boolean = not chanel.username
            public_type = not chanel.username
            User_id: int = owner.id
            desc_channel = chanel.title
            chanel_data = await app.get_chat(channel_id)
            url_Image_Channel = None

            if os.path.exists(f"uploads/{chanel.id}.#"):
                os.remove(f"uploads/{chanel.id}.#")

            if chanel_data.photo:
                await app.download_media(chanel_data.photo.big_file_id, f"uploads/{chanel.id}.jpg")
                url_Image_Channel = f"uploads/{chanel.id}.jpg"

            user: User = session.query(User).filter(User.id_telegram == User_id).first()
            db_chanel: Chanel = session.query(Chanel).filter(Chanel.id_telegram == channel_id).first()

            if not user:
                await app.send_message(ADMIN, f'Владелец канала не найден в бд! {owner.first_name} / @{owner.id} {"@" + owner.username if owner.username else ""}')
                return

            if db_chanel:
                db_chanel.is_active = True  # Активируем канал
                db_chanel.name_channel = chanel.title
                db_chanel.desc_channel = desc_channel
                db_chanel.link_Cannel = invite_url
                db_chanel.link_Type_Boolean = link_Type_Boolean
                db_chanel.url_Image_Channel = url_Image_Channel if url_Image_Channel else ""
                db_chanel.public_type = public_type
                db_chanel.count_subscribers = await app.get_chat_members_count(channel_id)
                db_chanel.views = 0
                db_chanel.reactions = 0
                db_chanel.posts_count = 0

                mounth_ago = datetime.datetime.now() - datetime.timedelta(days=31)

                async for m in app.get_chat_history(channel_id):
                    if m.views:
                        db_chanel.posts_count += 1
                        db_chanel.views += m.views
                    if m.reactions:
                        db_chanel.reactions += len(m.reactions.reactions)

                    if m.date < mounth_ago:
                        break

                db_chanel.verified = verified
            else:
                views = 0
                reactions = 0
                posts_count = 0
                mounth_ago = datetime.datetime.now() - datetime.timedelta(days=31)

                async for m in app.get_chat_history(channel_id):
                    if m.views:
                        posts_count += 1
                        views += m.views
                    if m.reactions:
                        reactions += len(m.reactions.reactions)

                    if m.date < mounth_ago:
                        break

                members = await app.get_chat_members_count(channel_id)

                chanel_data = {
                    "User_id": user.User_id,
                    "id_telegram": channel_id,
                    "name_channel": chanel.title,
                    "desc_channel": desc_channel,
                    "link_Cannel": invite_url,
                    "link_Type_Boolean": link_Type_Boolean,
                    "url_Image_Channel": url_Image_Channel if url_Image_Channel else "",
                    "public_type": public_type,
                    "count_subscribers": members,
                    "views": views,
                    "reactions": reactions,
                    "posts_count": posts_count,
                    "verified": verified,
                    "is_active": True  # Устанавливаем активность канала
                }

                data = Chanel(**chanel_data)
                session.add(data)
            session.commit()

@app.on_chat_member_updated()
async def handle_chat_member_update(client: Client, event: types.ChatMemberUpdated):
    if event.new_chat_member.user.is_self:
        chanel = session.query(Chanel).filter(Chanel.id_telegram == event.chat.id).first()
        if chanel:
            if event.new_chat_member.status in [enums.ChatMemberStatus.LEFT, enums.ChatMemberStatus.RESTRICTED]:
                chanel.is_active = False
                session.commit()
                await client.send_message(ADMIN, f'Канал {chanel.name_channel} был деактивирован.')
            elif event.new_chat_member.status == enums.ChatMemberStatus.MEMBER:
                chanel.is_active = False
                session.commit()
                await client.send_message(ADMIN, f'У бота сняли права администратора в канале {chanel.name_channel}.')

app.run()