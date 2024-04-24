const express = require('express')
const { Telegraf } = require('telegraf')
const crypto = require('crypto')
const url = require('url')
const querystring = require('querystring')

const app = express()
const PORT = process.env.PORT || 4000

const botToken = '6612351882:AAFFt2BKU4ZsYZP__mcWsfQvLZ-GtW4IAuQ'
const bot = new Telegraf(botToken)

// Middleware для обработки вебхуков от Telegram
app.use(bot.webhookCallback('/webhook'))

// Обработчик для OAuth коллбека от Telegram
const handleTelegramOAuthCallback = (req, res) => {
	const parsedUrl = url.parse(req.url)
	const queryParams = querystring.parse(parsedUrl.query)

	if (!queryParams.hash || !queryParams.payload) {
		res.status(400).send('Missing hash or payload')
		return
	}

	let payload
	try {
		payload = JSON.parse(Buffer.from(queryParams.payload, 'base64').toString())
	} catch (error) {
		res.status(400).send('Invalid payload')
		return
	}

	const hash = queryParams.hash
	const secretKey = crypto.createHash('sha256').update(botToken).digest()
	const checkHash = crypto
		.createHmac('sha256', secretKey)
		.update(queryParams.payload)
		.digest('hex')

	if (hash !== checkHash) {
		res.status(400).send('Invalid hash')
		return
	}

	const user = payload.user
	const userId = user.id
	const firstName = user.first_name
	const lastName = user.last_name
	const username = user.username

	// Здесь вы можете сохранить информацию о пользователе в вашей базе данных
	// ...

	res.send('User authenticated successfully!')
}

const webhookUrl = 'https://702e-31-40-130-47.ngrok-free.app/webhook'
bot.telegram.setWebhook(webhookUrl)

// Установка обработчика для OAuth коллбека
app.get('/auth/callback', handleTelegramOAuthCallback)

// Запуск Express сервера
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

// Запуск бота
bot.launch()
