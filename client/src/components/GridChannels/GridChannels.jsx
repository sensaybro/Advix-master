import DropDown from '../DropDown/DropDown'
import Search from '../InputSearch/Search'
import ChannelComponent from './ChannelComponent/ChannelComponent'
import { data } from './ChannelComponent/FakeData.js'
import style from './GridChannels.module.scss'
const GridChannels = () => {
	const args = [
		'Стоимость',
		'CPM',
		'Подписчики',
		'Просмотры на пост',
		'Вовлеченность (ERR)',
		'Рейтинг',
		'Отзывы',
	]
	const default_arg = 'Без сортировки'
	return (
		<div className={style.wrapperGrid}>
			<div className={style.wrapperHeaderGrid}>
				<Search />
				<DropDown default_arg={default_arg} args={args} />
			</div>
			<div className={style.GridChannelsComponentsWrapper}>
				{data.map(element => {
					return <ChannelComponent element={element} />
				})}
			</div>
		</div>
	)
}

export default GridChannels