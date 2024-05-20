import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import iconTelegram from '../../assets/telegram-svgrepo-com.svg'
import { setClickLogin } from '../../redux/reducers/ClickedLoginSlice'
import style from './PopupAuth.module.scss'
const PopupAuth = () => {
	const dispatch = useDispatch()
	const { logined } = useSelector(state => state.loginData)
	const handlePopup = () => {
		dispatch(setClickLogin(!logined))
	}
	return (
		<div className={style.wrapperPopupAuth}>
			<div className={style.titleBlockAuth}>
				<div>
					<span>Авторизация</span>
				</div>
				<button onClick={handlePopup} className={style.closeBtn}></button>
			</div>
			<div className={style.wrapperPopupLoginBtn}>
				<span>Нажмите на кнопку ниже, чтобы перейти в бот для авторизации</span>
				<a target='_blank' href={process.env.REACT_APP_LINK_BOT}>
					<img src={iconTelegram} alt='telegram' />
					Войти через Telegram
				</a>
				<span>*нажмите кнопку START в боте и следуйте инструкции</span>
			</div>
		</div>
	)
}

export default PopupAuth
