import { useParams } from 'react-router-dom'
import eye from '../../../assets/eye.svg'
import favorite from '../../../assets/favorite.svg'
import iconTgStats from '../../../assets/icon2/logo.png'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataChannelOne } from '../../../redux/reducers/ChannelOneDataSlice'
import Button from './Button/Button'
import Description from './Desciption/Description'
import style from './GridDetailChannels.module.scss'
import InfoAboutPublic from './InfoAboutPublic/InfoAboutPublic'
import LinkChannel from './LinkChannel/LinkChannel'
import PriceDefaultBlock from './PriceDefaultBlock/PriceDefaultBlock'
import PriceHotBlock from './PriceHotBlock/PriceHotBlock'
import Statistics from './Statistics/Statistics'
import StatisticsTgStat from './StatisticsTgStat/StatisticsTgStat'
const GridDetailChannels = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	let elementDetail = []
	const { channels, status } = useSelector(state => state.channelData)

	let data = []
	useEffect(() => {
		dispatch(fetchDataChannelOne(id))
	}, [])
	const data2 = useSelector(state => state.channelOneData)

	const statusOne = data2.statusOne
	console.log('status', status)
	if (status === 'success') {
		channels.map(element => {
			if (Number(element.id) == Number(id)) {
				console.log('element', element)
				return (elementDetail = element)
			}
		})
	}
	if (status !== 'success' && statusOne === 'success') {
		let priceObjects = data2.channel.priceObjects

		elementDetail = { ...data2.channel.data, priceObjects }
		console.log('elementDetail', elementDetail)
	}

	const ConvertIntToRUNumberFormat = among => {
		return new Intl.NumberFormat('ru', { style: 'decimal' }).format(among)
	}

	function ConvertIntToENNumberFormat(num) {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + 'M'
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'k'
		} else {
			return num.toString()
		}
	}

	return (
		statusOne === 'success' && (
			<div className={style.wrapperGridDetailChannels}>
				<div className={style.wrapperCatalog}>
					<Button />
					<div className={style.wrapperLinkAndInfoAbout}>
						<InfoAboutPublic type_public={!elementDetail.public_type} />
						<LinkChannel url={elementDetail.link_Cannel} />
					</div>
				</div>
				<div>
					<div className={style.ImgBackground}>
						<img
							src={elementDetail.url_background_channel}
							alt='background_channel_image'
						/>
					</div>
					<div className={style.wrapperChannelName}>
						<div className={style.wrapperIconAndName}>
							<div className={style.wrapperIcon}>
								<img
									src={`${process.env.REACT_APP_API_KEY}/chat_parser/${elementDetail.url_Image_Channel}`}
									alt='icon channel'
								/>
							</div>
							<div className={style.StatisticsRoot}>
								<div className={style.blockStatisticsNameChannel}>
									<span className={style.StatisticsNameChannel}>
										{elementDetail.name_channel}
									</span>
								</div>
								<div className={style.wrapperCategoryAndPosition}>
									<span className={style.bordedElement}>
										{elementDetail.Category}
									</span>
									<span className={style.bordedElement}>
										#{elementDetail.position}
									</span>
								</div>
								<div className={style.WrapperStatisticsMore}>
									<Statistics data={elementDetail} />
								</div>
								<div className={style.wrapperDesc}>
									<hr className={style.line} />
									<span>Описание</span>
									<Description content={elementDetail.desc_channel} />
									<hr className={style.line} />
								</div>
								<div className={style.wrapperStatisticsTitle}>
									<div className={style.wrapperStatsTitle}>
										<span>Статистика</span>
									</div>
									<button className={style.wrapperBtnTg}>
										<a>TGSTAT.RU</a>
										<img
											src={iconTgStats}
											className={style.TgStatsIcon}
											alt='tgstats'
										/>
									</button>
								</div>

								<StatisticsTgStat name_channel={elementDetail.name_channel} />
							</div>
						</div>
						<div className={style.wrapperStatistics}>
							<div className={style.wrapperTwoStatistics}>
								<div className={style.wrapperCountViews}>
									<span>
										{ConvertIntToENNumberFormat(Number(elementDetail.views))}
									</span>

									<img className={style.IconSize} src={eye} alt='eye' />
								</div>
								<div className={style.wrapperCountViews}>
									<span>
										{ConvertIntToRUNumberFormat(elementDetail.selected)}
									</span>
									<img
										className={style.IconSize}
										src={favorite}
										alt='favorite'
									/>
								</div>
							</div>
							<PriceDefaultBlock data={elementDetail} />
							<PriceHotBlock element={elementDetail} />
						</div>
					</div>
				</div>
			</div>
		)
	)
}

export default GridDetailChannels
