from pyrogram import Client, types, filters, raw, enums
import asyncio, os, re, string, random

from config import BOT_TOKEN, ADMIN, DOMAIN
from orm import User, Chanel, Secrets, session

app = Client(
    "account",
    api_id=24875030,
    api_hash="4b33e79d62ce82c073687b0b026cc671"
)

@app.on_message()
async def handle_message(app: Client, message: types.Message):

    if not os.path.exists(f"uploads/{message.from_user.id}.jpg"): # проверка существует ли аватарка
        file_path = None
        if message.from_user.photo:
            await app.download_media(message.from_user.photo.big_file_id, f"uploads/{message.from_user.id}.jpg")
            file_path = f"uploads/{message.from_user.id}.jpg"
        
    else: file_path = f"uploads/{message.from_user.id}.jpg"

    
    user: User = session.query(User).filter(User.id_telegram == message.from_user.id).first()
    if not user: 
        user = {
            'id_telegram': message.from_user.id,
            'link_image': file_path,
            'user_name': message.from_user.username,
            'is_premium': message.from_user.is_premium
        }
        user = User(
            **user
        )
        session.add(user)
        session.commit()    

    if re.fullmatch(r'[\.!]?[\s]?сайт', message.text, re.I) and message.chat.id == message.from_user.id:
        secret = ''.join([random.choice(string.ascii_letters + string.digits) for r in range(6)])
        url = f'{DOMAIN}/auth?secret={secret}'

        session.add(Secrets(
            token = secret,
            telegram_id = message.from_user.id
        ))
        session.commit()

        await message.reply(f'Перейдите на <a href="{url}">сайт</a> для авторизации!')
    
@app.on_raw_update()
async def handle_chat_member(app: Client, event, data: dict, details: dict):
    if isinstance(event, raw.types.UpdateChannel):

        channel_id = int(f"-100{event.channel_id}")
        chanel: raw.types.Channel = details.get(event.channel_id)
        is_join = not chanel.left

        if chanel.admin_rights:

            owner: types.ChatMember
            try:
                async for member in app.get_chat_members(channel_id):
                    if member.status == enums.ChatMemberStatus.OWNER:
                        owner: types.User = member.user
            except: return
            
            verified = chanel.verified

            await asyncio.sleep(3)
            
            await app.send_message(ADMIN, f'Аккаунт присоединился к каналу <a href="{chanel.username if chanel.username else ""}">{chanel.title}</a>!')

            if chanel.username:
                invite_url = 'https://t.me/' + chanel.username
            else: # генерация ссылки приглашения
                try:
                    invite_url = await app.create_chat_invite_link(channel_id, name=DOMAIN)
                    invite_url = invite_url.invite_link
                except:
                    async for u in app.get_chat_admin_invite_links(channel_id, limit=1):
                        invite_url = u.invite_link

            link_Type_Boolean = not chanel.username # если канал приватный то True
            public_type = not chanel.username
            User_id: int = owner.id
            desc_channel = chanel.title

            chanel_data = await app.get_chat(channel_id)

            url_Image_Channel = None # ниже парсинг фото канала

            if os.path.exists(f"uploads/{chanel.id}.#"):
                os.remove(f"uploads/{chanel.id}.#")

            if chanel_data.photo:
                await app.download_media(chanel_data.photo.big_file_id, f"uploads/{chanel.id}.jpg")
                url_Image_Channel = f"uploads/{chanel.id}.jpg"

            user: User = session.query(User).filter(User.id_telegram == User_id).first()
            db_chanel: Chanel = session.query(Chanel).filter(Chanel.id_telegram == channel_id).first()

            if not user: 
                await app.send_message(ADMIN, f'Владелец канала не найден в бд! {owner.first_name} / @{owner.id} {"@" + owner.username if owner.username else ""}')
                return # если владельца в бд нет, то блокируется добавление в бд чанела

            if db_chanel: # перезаписывает информацию о канале
                session.delete(db_chanel)
                session.commit()
                db_chanel = None

            views = 0
            reactions = 0
            posts_count = 0

            async for m in app.get_chat_history(channel_id):
                m: types.Message = m
                if m.views:
                    posts_count += 1
                    views += m.views
                if m.reactions:
                    reactions += len(m.reactions.reactions)

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
                "verified": verified
            }

            data = Chanel(
                **chanel_data
            )
            session.add(data)
            session.commit()

app.run()