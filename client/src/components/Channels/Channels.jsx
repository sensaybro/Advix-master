import React from 'react'
import GridChannels from '../GridChannels/GridChannels'
import WrapperFilter from '../wrapperFilter/WrapperFilter'
import style from './Channels.module.scss'
const Channels = () => {
	return (
		<div className={style.wrapperChannels}>
			<WrapperFilter />
			<GridChannels />
		</div>
	)
}

export default Channels
