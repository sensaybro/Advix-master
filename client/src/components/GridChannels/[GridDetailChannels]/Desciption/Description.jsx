import React from 'react'
import style from './Desciption.module.scss'
const Description = ({ content }) => {
	return (
		<div className={style.wrapperQuotes}>
			<span className={style.quotesStyle}>{content}</span>
		</div>
	)
}

export default Description
