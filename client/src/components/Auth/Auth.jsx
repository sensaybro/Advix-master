import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchUser } from '../../redux/reducers/UserSlice'
function Auth() {
	let location = useLocation()

	const searchParams = new URLSearchParams(location.search)
	const secret = searchParams.get('secret')
	console.log(secret)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { user, status } = useSelector(state => state.userData)

	console.log(secret)
	if (status === 'loading') {
		console.log('is a loading')
	} else if (status === 'error') {
		console.log('error')
	} else if (status === 'success') {
		console.log(status, user)
		navigate('/channels')
	}
	useEffect(() => {
		dispatch(fetchUser(secret))
	}, [secret])
}
export default Auth
