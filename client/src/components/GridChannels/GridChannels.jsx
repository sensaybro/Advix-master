import { useSelector } from 'react-redux'
import DropDown from '../DropDown/DropDown'
import Search from '../InputSearch/Search'
import ChannelComponent from './ChannelComponent/ChannelComponent'
import { data } from './ChannelComponent/FakeData.js'
import ChannelComponentHot from './ChannelComponentHot/ChannelComponentHot'
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
	const { pages } = useSelector(state => state.selectedCatalog)

	return (
		<div className={style.wrapperGrid}>
			<div className={style.wrapperHeaderGrid}>
				<Search />
				<DropDown default_arg={default_arg} args={args} />
			</div>
			<div className={style.GridChannelsComponentsWrapper}>
				{data.map(element => {
					return pages.label === 'Каталог' ? (
						<>
							{element.hot_state === false && (
								<ChannelComponent element={element} />
							)}
							{element.hot_state === true && (
								<ChannelComponentHot element={element} />
							)}
						</>
					) : (
						element.hot_state === true && (
							<ChannelComponentHot element={element} />
						)
					)
				})}
			</div>
		</div>
	)
}

export default GridChannels
