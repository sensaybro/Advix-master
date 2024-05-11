import { useNavigate } from 'react-router-dom'
import style from './Button.module.scss'
const Button = () => {
	const navigate = useNavigate()

	return (
		<button onClick={() => navigate(-1)} className={style.wrapperButton}>
			Назад в каталог
		</button>
	)
}

export default Button
