import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../header/Header'
import style from './MainLayout.module.scss'
const MainLayout = () => {
	return (
		<>
			<Header />

			<main className={style.wrapperMain}>
				<Outlet />
			</main>
			<Footer />
		</>
	)
}

export default MainLayout
