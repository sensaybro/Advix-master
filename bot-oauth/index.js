const { configDotenv } = require('dotenv')
const { Telegraf } = require('telegraf')
//const dotenv = require('dotenv')
configDotenv({ path: './.env' })
// Создаем экземпляр PrismaClient

// Создаем экземпляр Telegraf
const bot = new Telegraf(process.env.BOT_TOKEN)

// Обработчик команды /start
bot.command('start', async ctx => {
	try {
		// Берем ID пользователя
		const userId = ctx.from.id

		// Создаем токен сессии (в данном случае просто используем ID пользователя)
		const sessionToken = generateSessionToken(userId)

		// Проверяем наличие пользователя в базе данных
		// const user = await prisma.user.findUnique({
		// 	where: {
		// 		id: userId,
		// 	},
		// })
		console.log(userId)

		// if (user) {
		// 	// Если пользователь найден, отправляем сообщение об этом
		// 	ctx.reply('Вы уже зарегистрированы.')
		// } else {
		// 	// Если пользователь не найден, отправляем сообщение о регистрации и сохраняем пользователя в базу данных
		// 	await prisma.user.create({
		// 		data: {
		// 			id: userId,
		// 			sessionToken: sessionToken,
		// 		},
		// 	})
		// 	ctx.reply('Вы успешно зарегистрированы.')
		// }
	} catch (error) {
		console.error('Ошибка обработки команды /start:', error)
		ctx.reply('Произошла ошибка, попробуйте позже.')
	}
})

// Генерируем токен сессии (просто пример, вы можете использовать любую логику)
function generateSessionToken(userId) {
	return `session_token_${userId}`
}

// Запускаем бот
bot
	.launch()
	.then(() => {
		console.log('Бот запущен')
	})
	.catch(err => {
		console.error('Ошибка запуска бота:', err)
	})
