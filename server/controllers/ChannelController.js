import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const updateChannel = async (req, res) => {
	try {
		const {
			id,
			Category,
			language,
			//desc_channel,
			ERR,
			//count_subscribers,
			default_price,
			hot_price,
			hot_state,
			default_time_day,
			//	post_count,
			CPM,
			//views,
			//selected,
			url_background_channel,
			verified,
			is_published,
		} = req.body.channel
		//console.log(req)
		//id_channel, price, time, hot, for_hot, hot_date, currently_date
		const arrayData = req.body.channelPriceObjects
		console.log(req.body)
		const findIdPriceObjects = await prisma.priceObjects.findMany({
			where: { id_channel: id },
		})
		console.log('findIdPriceObjects', findIdPriceObjects)
		const updateChannel = await prisma.channel.update({
			where: {
				id,
			},
			data: {
				Category,
				language,
				//	desc_channel,
				ERR,
				//count_subscribers,
				default_price,
				hot_price,
				hot_state,
				default_time_day,
				//	posts_count: post_count,
				CPM,
				//views,
				//selected,
				url_background_channel,
				//verified,
				is_published,
			},
		})
		if (arrayData.length > 0 && findIdPriceObjects.length > 0) {
			let newIds = findIdPriceObjects.map(element => {
				element.id
			})
			let n = findIdPriceObjects.length
			let reverse_n = 0
			arrayData.map(element => {
				reverse_n += 1
				let index = findIdPriceObjects[n - reverse_n]
				console.log(index.id)
				updatePriceObject(element, index.id)
			})
		}
		if (arrayData.length > 0 && findIdPriceObjects.length === 0) {
			arrayData.map(element => {
				insertPriceObject(element, id)
			})
		}
		const { id_telegram, ...newUpdatedChannel } = updateChannel
		let updated = id_telegram.toString()
		newUpdatedChannel.id_telegram = updated
		return res.status(200).json({ newUpdatedChannel })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error })
	}
}
const updatePriceObject = async (element, id) => {
	try {
		console.log('id', id)
		await prisma.priceObjects.update({
			where: {
				id,
			},
			data: {
				price: element.price,
				time: element.time,
				hot: element.hot,
				hot_date:
					element.hot_date !== null
						? formatDateToISO8601(element.hot_date)
						: null,
				currently_date:
					element.currently_date !== null
						? formatDateToISO8601(element.currently_date)
						: null,
			},
		})
	} catch (error) {
		console.log(error)
	}
}
const insertPriceObject = async (element, id) => {
	try {
		await prisma.priceObjects.create({
			data: {
				price: element.price,
				time: element.time,
				hot: element.hot,
				for_hot: element.for_hot,
				hot_date:
					element.hot_date !== null
						? formatDateToISO8601(element.hot_date)
						: null,
				currently_date:
					element.currently_date !== null
						? formatDateToISO8601(element.currently_date)
						: null,
				id_channel: id,
			},
		})
	} catch (error) {
		console.log(error)
	}
}
function formatDateToISO8601(dateString) {
	const date = new Date(dateString)
	return date.toISOString()
}
export const getAllChannels = async (req, res) => {
	try {
		const allChannels = await prisma.channel.findMany()
		console.log(allChannels)
		const updatedAllChannels = allChannels.map(element => {
			return {
				...element,
				id_telegram: element.id_telegram.toString(),
			}
		})

		console.log(updatedAllChannels)
		return res.status(200).json({ updatedAllChannels })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error })
	}
}
export const getAllChannelsPublic = async (req, res) => {
	try {
		// Parse is_published parameter safely
		let isPublished = true // default value
		if (req.query.is_published !== undefined) {
			try {
				isPublished = JSON.parse(req.query.is_published)
			} catch (error) {
				return res
					.status(400)
					.json({ error: 'Invalid is_published query parameter' })
			}
		}

		const allChannels = await prisma.channel.findMany({
			where: {
				is_published: isPublished,
			},
		})

		if (allChannels.length === 0) {
			return res.status(404).json({ message: 'not found' })
		}

		const updatedAllChannels = allChannels.map(element => ({
			...element,
			id: element.id.toString(), // Convert BigInt to string
			id_telegram: element.id_telegram.toString(), // Convert BigInt to string
		}))

		const allChannelsAndPrice = await Promise.all(
			updatedAllChannels.map(async element => {
				const priceObjects = await findAllPricesObjects(element.id)
				return { ...element, priceObjects }
			})
		)

		console.log('allChannelsAndPrice', allChannelsAndPrice)
		return res.status(200).json(allChannelsAndPrice) // Removed extra object wrapping
	} catch (error) {
		console.error('Error fetching channels:', error)
		return res.status(500).json({ error: 'Internal server error' })
	}
}

const findAllPricesObjects = async id => {
	try {
		const allPriceObjects = await prisma.priceObjects.findMany({
			where: {
				id_channel: Number(id), // Ensure BigInt conversion if needed
			},
		})
		//console.log('allPriceObjects', allPriceObjects)
		// Convert BigInt values to strings
		const updated = allPriceObjects.map(element => ({
			...element,
			id: element.id.toString(), // Convert BigInt to string
			price: element.price.toString(), // Convert BigInt to string
		}))
		console.log('updated', updated)
		return updated
	} catch (error) {
		console.error('Error fetching price objects:', error)
		return []
	}
}

const findAsyncObject = async findOneObject => {
	try {
		let priceObjects = await findAllPricesObjects(findOneObject.id)
		return priceObjects
	} catch (error) {
		return []
	}
}
export const getOneChannel = async (req, res) => {
	try {
		const { id } = req.query
		console.log(id)
		if (id === undefined) {
			return res.status(404).json({ message: 'не указан параметр' })
		}
		const findOneObject = await prisma.channel.findUnique({
			where: {
				id: Number(id),
			},
		})
		if (findOneObject === null) {
			return res.status(404).json({ message: 'object not found' })
		}
		let serilzed_id_telegram = findOneObject.id_telegram.toString()
		findOneObject.id_telegram = serilzed_id_telegram
		let priceObjects = await findAsyncObject(findOneObject)
		console.log('price', priceObjects)
		return res.status(200).json({ data: findOneObject, priceObjects })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ error: 'Internal server error' })
	}
}
