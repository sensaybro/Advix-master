import React, { useState } from 'react'
import logo from '../../assets/advix_blue.svg'
import telegram from '../../assets/telegram-svgrepo-com.svg'
import { SwitchButton } from '../SwitchButton/SwitchButton'
import style from './Header.module.scss'
const Header = () => {
	const [clickedHotBtn, setClickedHotBtn] = useState(false)
	const [clickedCatalogBtn, setClickedCatalogBtn] = useState(false)
	const handleClickHotBtn = () => {
		setClickedHotBtn(!clickedHotBtn)
		setClickedCatalogBtn(false)
	}
	const handleClickCatalogBtn = () => {
		setClickedCatalogBtn(!clickedCatalogBtn)
		setClickedHotBtn(false)
	}
	return (
		<header className={style.wrapperHeader}>
			<div>
				<img width={62} height={62} src={logo} alt='advix' />
			</div>
			<div className={style.catalogHeader}>
				<button
					onClick={handleClickCatalogBtn}
					className={
						clickedCatalogBtn
							? `${style.clickedCatalogBtn}`
							: `${style.nonClickedCatalogBtn}`
					}
				>
					<span>КАТАЛОГ</span>
				</button>
				<button
					onClick={handleClickHotBtn}
					className={
						clickedHotBtn
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
					<img width={19} height={16} src={telegram} alt='telegram' />
					<span>Войти</span>
				</button>
			</div>
		</header>
	)
}

export default Header
