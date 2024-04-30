import { PrismaClient } from '@prisma/client' // Импортируем PrismaClient с указанием пути
import axios from 'axios'
import dotenv from 'dotenv' // Используем импорт по умолчанию для dotenv
import fs from 'fs'
import path from 'path'
import { Telegraf } from 'telegraf'

const prisma = new PrismaClient()
dotenv.config() // Используем функцию config() напрямую

const bot = new Telegraf(process.env.BOT_TOKEN)
// Обработчик команды /start
async function downloadImage(url, destination) {
	const response = await axios({
		method: 'GET',
		url: url,
		responseType: 'stream',
	})

	const writer = fs.createWriteStream(destination)

	response.data.pipe(writer)

	return new Promise((resolve, reject) => {
		writer.on('finish', resolve)
		writer.on('error', reject)
	})
}

async function processImage(url) {
	const currentTimestamp = Date.now() // Получаем текущее время в миллисекундах
	const fileName = `${currentTimestamp}.jpg` // Формируем уникальное имя файла
	const currentModuleDir = path.dirname(new URL(import.meta.url).pathname)
	const destination = path.join(currentModuleDir, 'uploads', fileName)

	try {
		await downloadImage(url, destination)
		console.log(`Изображение успешно сохранено в ${destination}`)
		return fileName
	} catch (error) {
		console.error('Ошибка при сохранении изображения:', error)
	}
}

bot.command('start', async ctx => {
	try {
		// Берем ID пользователя
		const userId = ctx.message.from.id
		console.log('userid', userId)

		// Проверяем наличие пользователя в базе данных
		const user = await prisma.user.findUnique({
			where: {
				id_telegram: userId,
			},
		})

		if (user) {
			// Если пользователь найден, отправляем сообщение об этом
			await ctx.reply('Вы уже зарегистрированы.')
		} else {
			// Если пользователь не найден, отправляем сообщение о регистрации и сохраняем пользователя в базе данных
			const userName = ctx.from.username // Сохраняем имя пользователя Telegram
			let linkImage2 = ''
			if (userName === undefined) {
				await ctx.reply('Пожалуйста, создайте уникальный @username')
				return
			}

			// Получаем ссылку на изображение пользователя, если она доступна
			console.log('ctx.from.id', ctx.from.id)
			const userProfilePhotos = await ctx.telegram.getUserProfilePhotos(
				ctx.from.id
			)

			if (
				userProfilePhotos.total_count > 0 &&
				userProfilePhotos.photos[0].length > 0
			) {
				const fileId = userProfilePhotos.photos[0][0].file_id
				const fileLink = await ctx.telegram.getFileLink(fileId)
				console.log('Ссылка на изображение профиля:', fileLink.href)
				linkImage2 = await processImage(fileLink.href)
			} else {
				console.log('Изображение профиля пользователя недоступно.')
				// Добавьте здесь необходимую обработку для случая, когда изображение профиля недоступно
			}

			await prisma.user.create({
				data: {
					id_telegram: userId,
					user_name: userName,
					link_image: linkImage2 !== '' ? `uploads/${linkImage2}` : '',
				},
			})

			await ctx.reply('Вы успешно авторизовались.')
		}
	} catch (error) {
		console.error('Ошибка обработки команды /start:', error)

		// Отправляем сообщение об ошибке пользователю
		await ctx.reply('Произошла ошибка, попробуйте позже.')

		// Логируем ошибку
		console.error('Ошибка в обработчике команды /start:', error)
	}
})

// Генерируем токен сессии (просто пример, вы можете использовать любую логику)

// Запускаем бот

// Генерируем токен сессии (просто пример, вы можете использовать любую логику)

async function handleAddCommand(ctx) {
	try {
		const chatInfo = await ctx.telegram.getChat(ctx.chat.id, {
			cache_time: 0,
		})

		// Ваш остальной код обработки информации о чате

		// Дальнейшая обработка информации о канале
		console.log('ID канала:', chatInfo.id)
		console.log('Название канала:', chatInfo.title)
		console.log('Имя пользователя канала:', chatInfo.username)
		console.log('Описание канала:', chatInfo.description)
		console.log('Пригласительная ссылка на канал:', chatInfo.invite_link)
		console.log('URL аватарки канала:', avatarUrl)
		console.log('Тип чата:', chatType)

		// Выводим ID пользователя
		console.log('ID пользователя:', ctx.from.id)

		// Дополнительные действия, например, сохранение данных в базу данных
	} catch (error) {
		console.error(
			'Ошибка при проверке статуса бота в чате или при получении информации о чате:',
			error.message
		)
		// Обработка других ошибок
		await ctx.reply('Произошла ошибка при выполнении команды.')
	}
}

// Обработчик команды /add

// Обработчик события my_chat_member
// Обработчик события my_chat_member
bot.on('channel_post', async (ctx, next) => {
	try {
		console.log(ctx.update.channel_post.text)
		if (ctx.update.channel_post.text == '/add') {
			await handleAddCommand(ctx)
		}
		// const newChatMember = ctx.update.my_chat_member.new_chat_member
		// const oldChatMember = ctx.update.my_chat_member.old_chat_member

		// if (
		// 	newChatMember.status === 'kicked' &&
		// 	oldChatMember.status === 'administrator'
		// ) {
		// 	console.error('Бот был удален из чата.')
		// 	await ctx.reply('Бот был удален из чата.')
		// 	return
		// }

		// if (newChatMember.status === 'administrator') {
		// 	await handleAddCommand(ctx)
		// }
	} catch (error) {
		console.log(error)
		await ctx.reply('Произошла ошибка')
	}
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
