import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../assets/advix_blue.svg'
import telegram from '../../assets/telegram-svgrepo-com.svg'
import { setClickLogin } from '../../redux/reducers/ClickedLoginSlice'
import { setCatalog } from '../../redux/reducers/SelectedCatalogSlice'
import PopupAuth from '../PopupAuth/PopupAuth'
import { SwitchButton } from '../Switcher2/Switcher/Switcher'
import style from './Header.module.scss'
const Header = () => {
	const [clickedHotBtn, setClickedHotBtn] = useState(false)
	const [clickedCatalogBtn, setClickedCatalogBtn] = useState(false)
  const [clickedLogin, setClickedLogin]= useState(false)
	const dispatch = useDispatch()
	const handleClickHotBtn = () => {
		setClickedHotBtn(!clickedHotBtn)
		setClickedCatalogBtn(false)
		dispatch(setCatalog({ label: 'Горящие', state: true }))
	}
	const handleClickCatalogBtn = () => {
		setClickedCatalogBtn(!clickedCatalogBtn)
		setClickedHotBtn(false)
		dispatch(setCatalog({ label: 'Каталог', state: true }))
	}
	const { pages } = useSelector(state => state.selectedCatalog)
	const { user, status } = useSelector(state => state.userData)
	const { theme } = useSelector(state => state.theme)
	const token = Cookies.get('token')
	useEffect(() => {
		if (!theme) {
			document.body.classList.add('dark')
		} else {
			document.body.classList.remove('dark')
		}
	}, [theme])
  const {logined} = useSelector(state=>state.loginData)
  const handlerPopupAuth = () => {
   /*  dispatch(setClickedLogin(true)) */
     //setClickedLogin(!clickedLogin)
    // setClickedLogin(!clickedLogin)
    dispatch(setClickLogin(!logined))
  }
	return (
		<header className={style.wrapperHeader}>
			<div>
				<img src={logo} alt='advix' />
			</div>
			<div className={style.catalogHeader}>
				<button
					onClick={handleClickCatalogBtn}
					className={
						pages.label !== 'Горящие'
							? `${style.clickedCatalogBtn}`
							: `${style.nonClickedCatalogBtn}`
					}
				>
					<span>КАТАЛОГ</span>
				</button>
				<button
					onClick={handleClickHotBtn}
					className={
						pages.label === 'Горящие'
							? `${style.clickedHotBtn}`
							: `${style.nonClickedHotBtn}`
					}
				>
					<span>ГОРЯЩИЕ 🔥</span>
				</button>
			</div>
			<div className={style.lastWrapperInHeader}>
				<SwitchButton />
				<button onClick={handlerPopupAuth} className={style.LoginBtn}>
						<img
							src={
								status !== 'success'
									? telegram
									: `${process.env.REACT_APP_API_KEY}/chat_parser/${user.link_image}`
							}
							alt='telegram'
						/>
						<span>{status !== 'success' ? 'Войти' : `${user.user_name}`}</span>
				</button>
			</div>
      
		</header>
	)
}

export default Header
