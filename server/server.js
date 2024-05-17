import { PrismaClient } from '@prisma/client' // Импортируем PrismaClient с указанием пути
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv' // Используем импорт по умолчанию для dotenv
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import multer from 'multer'
import channelRouter from './routes/ChannelRouter.js'
import router from './routes/UserRouter.js'
const prisma = new PrismaClient()
dotenv.config({ path: './.env' })
const app = express()
const PORT = process.env.PORT
app.use(cors())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(express.json({ limit: '50mb' }))
app.use(bodyParser.json({ limit: '200mb' }))
app.use(
	bodyParser.urlencoded({
		limit: '200mb',
		extended: true,
		parameterLimit: 1000000,
	})
)

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/') // Uploads will be stored in the 'uploads' directory
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname))
	},
})

const upload = multer({ storage: storage })

// Serve the HTML page with a form for image upload
app.get('/', (req, res) => {
	res.status(200).send('hello world!')
	//res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/upload', upload.single('image'), async (req, res) => {
	try {
		if (req.file) {
			const imageUrl = `/uploads/${req.file.filename}`
			const newImage = new Image({
				filename: req.file.filename,
				path: imageUrl,
			})

			await newImage.save()

			res.json({ imagelink: imageUrl }) // Only return the image URL
		} else {
			res.status(400).send('No image file provided')
		}
	} catch (error) {
		console.error(error)
		res.status(500).send('Internal Server Error')
	}
})

app.use('/auth', router)
app.use('/channel/', channelRouter)
app.use('/chat_parser/uploads', express.static('chat_parser/uploads'))
async function start() {
	try {
		// Create a new PrismaClient instance
		const prisma = new PrismaClient()

		// Connect to the database
		await prisma.$connect()

		// Start the server
		app.listen(PORT, err => {
			if (err) return console.log('App crashed: ', err)
			console.log(`Server started successfully! Port: ${PORT}`)
		})
	} catch (err) {
		console.log(err)
	}
}

start()
