import express from 'express'
import { ChannelController } from '../controllers/index.js'

const router = express.Router()

router.put('/:id', ChannelController.updateChannel)

router.get('/all', ChannelController.getAllChannels)
router.get('/all_published', ChannelController.getAllChannelsPublic)
router.get('/one', ChannelController.getOneChannel)
export default router
