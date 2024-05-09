import { useParams } from 'react-router-dom'
import eye from '../../../assets/eye.svg'
import favorite from '../../../assets/favorite.svg'
import { data } from '../ChannelComponent/FakeData'
import Button from './Button/Button'
import style from './GridDetailChannels.module.scss'
import InfoAboutPublic from './InfoAboutPublic/InfoAboutPublic'
import LinkChannel from './LinkChannel/LinkChannel'
import Statistics from './Statistics/Statistics'
const GridDetailChannels = () => {
	const { id } = useParams()

	const result = data.filter(element => {
		return element.id == id
	})
	const elementDetail = result[0]
	console.log(elementDetail.public_type)
	return (
		<div className={style.wrapperGridDetailChannels}>
			<div className={style.wrapperCatalog}>
				<Button />
				<div className={style.wrapperLinkAndInfoAbout}>
					<InfoAboutPublic type_public={elementDetail.public_type} />
					<LinkChannel url={elementDetail.link_Cannel} />
				</div>
			</div>
			<div className={style.ImgBackground}>
				<img
					src={elementDetail.url_background_channel}
					alt='background_channel_image'
				/>
			</div>

			<div className={style.wrapperChannelName}>
				<div className={style.wrapperIconAndName}>
					<img src={elementDetail.url_Image_Channel} alt='' />
					<div className={style.StatisticsRoot}>
						<div className={style.blockStatisticsNameChannel}>
							<span className={style.StatisticsNameChannel}>
								{elementDetail.name_channel}
							</span>
						</div>
						<div className={style.WrapperStatisticsMore}>
							<Statistics data={elementDetail} />
						</div>
					</div>
				</div>
				<div className={style.wrapperStatistics}>
					<div className={style.wrapperCountViews}>
						<span>{elementDetail.count_views}</span>
						<img width={28} height={22} src={eye} alt='' />
					</div>
					<div className={style.wrapperCountViews}>
						<span>{elementDetail.selected}</span>
						<img width={28} height={22} src={favorite} alt='' />
					</div>
				</div>
			</div>
		</div>
	)
}

export default GridDetailChannels
