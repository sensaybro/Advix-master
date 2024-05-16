import { PrismaClient } from '@prisma/client' //
import jwt from 'jsonwebtoken'
export const getMe = async (req, res) => {
	try {
		const prisma = new PrismaClient()
		const { id_telegram, secret } = req.query

		const result_token = await prisma.connect.findUnique({
			where: {
				token: secret,
			},
		})

		if (!result_token) {
			return res.status(404).json({ message: 'Объект не был найден' })
		} else {
			const result = await prisma.user.findUnique({
				where: {
					id_telegram: result_token.telegram_id,
				},
			})
			const { id_telegram, ...newUser } = result
			const token = jwt.sign(
				{
					_id: result_token.telegram_id,
				},
				'BEBRA',
				{ expiresIn: '30d' }
			)

			const seariliezed_id_telegram = id_telegram.toString()
			newUser.seariliezed_id_telegram = seariliezed_id_telegram
			return res.status(200).json({ message: { newUser, token } })
		}
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'ошибка сервера' })
	}
}
