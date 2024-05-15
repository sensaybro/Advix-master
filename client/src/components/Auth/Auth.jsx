import axios from 'axios'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
function Auth() {
	let location = useLocation()

	const searchParams = new URLSearchParams(location.search)
	const secret = searchParams.get('secret')
	console.log(secret)
	const navigate = useNavigate()
	// Теперь у вас есть значение параметра secret из URL, которое вы можете использовать внутри вашего компонента
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const result = await axios.get(
					`${process.env.REACT_APP_API_KEY}/auth/user`,
					{
						params: {
							secret,
						},
					}
				)
				console.log(result)
				if (result.status === 200) {
					console.log('r')
					navigate('/channels')
				}
			} catch (error) {
				console.log(error)
			}
		}
		fetchUser()
	}, [secret])
}
export default Auth
