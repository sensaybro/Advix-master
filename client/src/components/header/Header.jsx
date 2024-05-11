import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../assets/advix_blue.svg'
import telegram from '../../assets/telegram-svgrepo-com.svg'
import { setCatalog } from '../../redux/reducers/SelectedCatalogSlice'
import { SwitchButton } from '../SwitchButton/SwitchButton'
import style from './Header.module.scss'
const Header = () => {
	const [clickedHotBtn, setClickedHotBtn] = useState(false)
	const [clickedCatalogBtn, setClickedCatalogBtn] = useState(false)
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
	const { theme } = useSelector(state => state.theme)
	console.log(theme)
	useEffect(() => {
		if (!theme) {
			document.body.classList.add('dark')
		} else {
			document.body.classList.remove('dark')
		}
	}, [theme])
	return (
		<header className={style.wrapperHeader}>
			<div>
				<img width={62} height={62} src={logo} alt='advix' />
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
				<button className={style.LoginBtn}>
					<a target='_blank' href='https://t.me/AdvixOAuth_bot'>
						<img width={19} height={16} src={telegram} alt='telegram' />
						<span>Войти</span>
					</a>
				</button>
			</div>
		</header>
	)
}

export default Header
