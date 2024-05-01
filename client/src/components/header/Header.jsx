import React from 'react'
import logo from '../../assets/advix_blue.svg'
import style from './Header.module.scss'
const Header = () => {
	return (
		<header className={style.wrapperHeader}>
			<img width={25} height={25} src={logo} alt='advix' />
			<div>
				<button>
					<span>Каталог</span>
					<img src='' alt='' />
				</button>
				<button>
					<span>Горящие</span>
					<img src='' alt='fire' srcset='' />
				</button>
				<div>
					<button>theme</button>
					<button>
						<img src='' alt='telegram' />
						<span>Войти</span>
					</button>
				</div>
			</div>
		</header>
	)
}

export default Header
