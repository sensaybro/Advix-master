import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../header/Header'
import PopupAuth from '../PopupAuth/PopupAuth'
import style from './MainLayout.module.scss'
const MainLayout = () => {
 const {logined} = useSelector(state=>state.loginData)

	return (
		<>
			<Header />

			<main className={style.wrapperMain}>
				<Outlet />
			</main>
			<Footer />
      {
        logined && <PopupAuth/>
      }
		</>
	)
}

export default MainLayout
