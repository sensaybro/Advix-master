import asyncio, os, re, string, random

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode, chat_member_status
from aiogram.types import Message, InlineKeyboardMarkup, InlineKeyboardButton, ReplyKeyboardMarkup, KeyboardButton

from config import BOT_TOKEN, ADMIN, DOMAIN
from orm import User, Chanel, Secrets, session

dp = Dispatcher()
""" # код для обработки постов
@dp.channel_post()
async def handler(message: Message):

    content = message.html_text
    photos = message.photo
"""

@dp.my_chat_member()
async def handler(message: Message):

    if message.new_chat_member.status == chat_member_status.ChatMemberStatus.KICKED:
        await message.bot.send_message(ADMIN, f'<b>Бот покинул канал:</b> {message.chat.title} / <code>{message.chat.id}</code>')

    if message.new_chat_member.status == chat_member_status.ChatMemberStatus.ADMINISTRATOR:
        await message.bot.send_message(ADMIN, f'<b>Зарегистрирован новый канал:</b> {message.chat.title} / <code>{message.chat.id}</code>')

        await asyncio.sleep(3) # пока телеграм очухается о вступлении бота в канал

        chat = await message.bot.get_chat(message.chat.id)

        invite_url = chat.invite_link if not chat.username else 'https://t.me/' + chat.username
        link_Type_Boolean = not chat.username # если канал приватный то True
        public_type = not chat.username
        User_id = message.from_user.id
        desc_channel = chat.title

        url_Image_Channel = None # ниже парсинг фото канала

        if os.path.exists(f"uploads/{message.chat.id}.#"):
            os.remove(f"uploads/{message.chat.id}.#")

        if chat.photo:
            file = await message.bot.get_file(chat.photo.big_file_id)
            file_type = file.file_path.split('.')[-1]
            url_Image_Channel = f"uploads/{message.chat.id}.{file_type}"

            await message.bot.download_file(file.file_path, url_Image_Channel)

        user: User = session.query(User).filter(User.id_telegram == User_id).first()
        chanel: Chanel = session.query(Chanel).filter(Chanel.id_telegram == chat.id).first()

        if chanel: # перезаписывает информацию о канале
            session.delete(chanel)
            session.commit()
            chanel = None

        members = await message.bot.get_chat_member_count(chat.id)

        chanel_data = {
            "User_id": user.User_id,
            "id_telegram": chat.id,
            "name_channel": chat.title,
            "desc_channel": desc_channel,
            "link_Cannel": invite_url,
            "link_Type_Boolean": link_Type_Boolean,
            "url_Image_Channel": url_Image_Channel if url_Image_Channel else "",
            "public_type": public_type,
            "count_subscribers": members
        }
        data = Chanel(
            **chanel_data
        )
        session.add(data)
        session.commit()
        # print(chanel_data)

@dp.message()
async def handler(message: Message):
    
    if not os.path.exists(f"uploads/{message.from_user.id}.#"): # проверка существует ли аватарка
        chat = await message.bot.get_chat(message.from_user.id)

        if chat.photo:
            file = await message.bot.get_file(chat.photo.big_file_id)

            file_type = file.file_path.split('.')[-1]
            file_path = f"uploads/{message.from_user.id}.{file_type}"

            await message.bot.download_file(file.file_path, file_path)
        else: file_path = None
    else: f"uploads/{message.from_user.id}.jpg"

    
    user: User = session.query(User).filter(User.id_telegram == message.from_user.id).first()
    if not user: 
        user = {
            'id_telegram': message.from_user.id,
            'link_image': file_path,
            'user_name': message.from_user.username
        }
        # print(user)
        user = User(
            **user
        )
        session.add(user)
        session.commit()


    if message.text.lower() == '/start':
        markup = ReplyKeyboardMarkup(resize_keyboard=True, keyboard=([[KeyboardButton(text="Перейти на сайт")]]))
        await message.reply('Добро пожаловать! Регистрация успешна', reply_markup=markup)
    

    if message.text.lower() == 'перейти на сайт':
        secret = ''.join([random.choice(string.ascii_letters + string.digits) for r in range(6)])
        url = f'{DOMAIN}/auth?secret={secret}'

        session.add(Secrets(
            token = secret,
            telegram_id = message.from_user.id
        ))
        session.commit()

        markup = InlineKeyboardMarkup(inline_keyboard=[[InlineKeyboardButton(text="Авторизация", url=url)]])
        await message.reply('Авторизация на сайте', reply_markup=markup)
    


async def main():
    bot = Bot(token=BOT_TOKEN, default=DefaultBotProperties(parse_mode=ParseMode.HTML))
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())