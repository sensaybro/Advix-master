import { PrismaClient } from '@prisma/client' // Импортируем PrismaClient с указанием пути
import dotenv from 'dotenv' // Используем импорт по умолчанию для dotenv

const prisma = new PrismaClient()
dotenv.config({ path: './.env' })

app.use(cors())
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
app.post('/upload', checkAuth, upload.single('image'), async (req, res) => {
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
