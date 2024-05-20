import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataChannel } from '../../redux/reducers/ChannelDataSlice'
import DropDown from '../DropDown/DropDown'
import Search from '../InputSearch/Search'
import PaginationButton from '../PaginationButton/PaginationButton.jsx'
import ChannelComponent from './ChannelComponent/ChannelComponent'
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
	const dispatch = useDispatch()

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch(fetchDataChannel())
			} catch (error) {
				console.log(error)
			}
		}
		fetchData()
	}, [])
	const { channels, status } = useSelector(state => state.channelData)

	return (
		<div className={style.wrapperGrid}>
			<div className={style.wrapperHeaderGrid}>
				<Search />
				<DropDown default_arg={default_arg} args={args} />
			</div>
			<div className={style.GridChannelsComponentsWrapper}>
{
          status === 'error' && <div>не удалось получить данные с сервером :(</div>
        }

				{status === 'success' &&
					channels.map(element => {
						return pages.label === 'Каталог' ? (
							<>
								<ChannelComponent element={element} />
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
			<PaginationButton />
		</div>
	)
}

export default GridChannels
