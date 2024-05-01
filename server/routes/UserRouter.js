import express from 'express'
import { UserController } from '../controllers/index.js'

const router = express.Router()

router.get('/user', UserController.getMe)
export default router
