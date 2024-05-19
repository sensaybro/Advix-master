import React from 'react'
import style from './StatisticsTgStat.module.scss'
const StatisticsTgStat = ({ name_channel }) => {
	console.log(name_channel)
	return (
		<div className={style.wrapper}>
			<img
				src={`https://tgstat.ru/channel/@${name_channel}/stat-widget.png`}
				alt={name_channel}
			/>
		</div>
	)
}

export default StatisticsTgStat
