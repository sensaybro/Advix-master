import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../header/Header'
import style from './MainLayout.module.scss'
const MainLayout = () => {
	return (
		<div className={style.wrapperMain}>
			<div>
				<Header />
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	)
}

export default MainLayout
