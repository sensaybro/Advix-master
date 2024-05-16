import { PrismaClient } from '@prisma/client' //
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config({ path: '../.env' })
export const getMe = async (req, res) => {
	const key = process.env.SECRET_KEY
	try {
		const prisma = new PrismaClient()
		const { secret } = req.query

		const result_token = await prisma.connect.findUnique({
			where: {
				token: secret,
			},
		})

		if (!result_token) {
			return res.status(404).json({ message: 'Объект не был найден' })
		} else {
			console.log('reuslt', result_token.telegram_id)
			const result = await prisma.user.findUnique({
				where: {
					id_telegram: result_token.telegram_id,
				},
			})
			const { id_telegram, ...newUser } = result
			console.log('newUser.user_name', newUser.user_name)
			const token = jwt.sign(
				{
					user_name: newUser.user_name,
				},
				key,
				{ expiresIn: '30d' }
			)

			return res.status(200).json({ message: { newUser, token } })
		}
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'ошибка сервера' })
	}
}
export const authorizationUser = async (req, res) => {
	try {
		const prisma = new PrismaClient()
		const { user_name } = req
		const result = await prisma.user.findUnique({
			where: {
				user_name,
			},
		})
		console.log(result)
	} catch (error) {
		console.log(error)
	}
}
