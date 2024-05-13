import React from 'react'

import style from './Footer.module.scss'

function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className={style.footerWrap}>
			<div className={style.footerWrapper}>
				<span className={style.titleFooter}>Важно</span>
				<div className={style.links}>
					<a href='#'>Пользовательское соглашение</a>
					<a href='#'>Политика конфиденциальности</a>
					<span>&copy; {currentYear}</span>
				</div>
			</div>

			<div className={style.footerWrapper}>
				<span className={style.titleFooter}>Advix</span>
				<div className={style.links}>
					<a href='#'>Каталог</a>
					<a href='#'>База знаний</a>
					<a href='#'>Партнерам</a>
					<span>support@domain.ru</span>
				</div>
			</div>

			<div className={style.footerWrapper}>
				<span className={style.titleFooter}>Telegram</span>
				<div className={style.links}>
					<a href='https://t.me/advixbot'>Бот уведомлений</a>
					<a href='https://t.me/advixnews'>Новостной канал</a>
					<a href='https://t.me/advixchat'>Общаемся о сервисе</a>
					<a href='https://t.me/advixsupportbot'>Поддержка</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer
