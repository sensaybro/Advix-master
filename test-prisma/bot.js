//import { PrismaClient } from '@prisma/client' // Импорт PrismaClient с указанием пути
import dotenv from 'dotenv' // Использование импорта по умолчанию для dotenv
import { Telegraf } from 'telegraf'

dotenv.config() // Используйте функцию config() напрямую

// const prisma = new PrismaClient()
const bot = new Telegraf(process.env.BOT_TOKEN)
// Обработчик команды /start
// bot.command('start', async ctx => {
// 	try {
// 		// Берем ID пользователя
// 		const userId = ctx.from.id

// 		// Создаем токен сессии (в данном случае просто используем ID пользователя)
// 		const sessionToken = generateSessionToken(userId)

// 		// Проверяем наличие пользователя в базе данных
// 		const user = await prisma.user.findUnique({
// 			where: {
// 				id: userId,
// 			},
// 		})

// 		if (user) {
// 			// Если пользователь найден, отправляем сообщение об этом
// 			ctx.reply('Вы уже зарегистрированы.')
// 		} else {
// 			// Если пользователь не найден, отправляем сообщение о регистрации и сохраняем пользователя в базу данных
// 			await prisma.user.create({
// 				data: {
// 					id: userId,
// 					sessionToken: sessionToken,
// 				},
// 			})
// 			ctx.reply('Вы успешно зарегистрированы.')
// 		}
// 	} catch (error) {
// 		console.error('Ошибка обработки команды /start:', error)
// 		ctx.reply('Произошла ошибка, попробуйте позже.')
// 	}
// })

// Генерируем токен сессии (просто пример, вы можете использовать любую логику)
function generateSessionToken(userId) {
	return `session_token_${userId}`
}
bot.on('my_chat_member', async (ctx, next) => {
	if (
		ctx.chat.type === 'channel' &&
		ctx.update.my_chat_member.new_chat_member &&
		ctx.update.my_chat_member.new_chat_member.status === 'administrator'
	) {
		try {
			// Получаем информацию о чате (канале)
			const chatInfo = await ctx.telegram.getChat(ctx.chat.id)

			// Получаем ID пользователя
			const userId = ctx.from.id

			// Извлекаем нужные данные о канале
			const { id, title, username, description, invite_link, photo } = chatInfo

			// Обработка аватарки канала
			let avatarUrl = ''
			if (photo && photo.big_file_id) {
				const avatarInfo = await ctx.telegram.getFile(photo.big_file_id)
				avatarUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${avatarInfo.file_path}`
			}

			// Дальнейшая обработка информации о канале
			console.log('ID канала:', id)
			console.log('Название канала:', title)
			console.log('Имя пользователя канала:', username)
			console.log('Описание канала:', description)
			console.log('Пригласительная ссылка на канал:', invite_link)
			console.log('URL аватарки канала:', avatarUrl)

			// Выводим ID пользователя
			console.log('ID пользователя:', userId)

			// Здесь вы можете выполнить любые дополнительные действия с полученными данными, например, сохранить их в базу данных
		} catch (error) {
			console.error('Ошибка при получении информации о канале:', error)
		}
	}
	return next()
})

// Запускаем бот
bot
	.launch()
	.then(() => {
		console.log('Бот запущен')
	})
	.catch(err => {
		console.error('Ошибка запуска бота:', err)
	})
