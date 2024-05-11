import { useParams } from 'react-router-dom'
import eye from '../../../assets/eye.svg'
import favorite from '../../../assets/favorite.svg'
import { data } from '../ChannelComponent/FakeData'
import Button from './Button/Button'
import Description from './Desciption/Description'
import style from './GridDetailChannels.module.scss'
import InfoAboutPublic from './InfoAboutPublic/InfoAboutPublic'
import LinkChannel from './LinkChannel/LinkChannel'
import PriceDefaultBlock from './PriceDefaultBlock/PriceDefaultBlock'
import PriceHotBlock from './PriceHotBlock/PriceHotBlock'
import Statistics from './Statistics/Statistics'
const GridDetailChannels = () => {
	const { id } = useParams()

	const result = data.filter(element => {
		return element.id == id
	})
	const elementDetail = result[0]

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
		<div className={style.wrapperGridDetailChannels}>
			<div className={style.wrapperCatalog}>
				<Button />
				<div className={style.wrapperLinkAndInfoAbout}>
					<InfoAboutPublic type_public={elementDetail.public_type} />
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
							<img src={elementDetail.url_Image_Channel} alt='' />
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
						</div>
					</div>
					<div className={style.wrapperStatistics}>
						<div className={style.wrapperTwoStatistics}>
							<div className={style.wrapperCountViews}>
								<span>
									{ConvertIntToENNumberFormat(elementDetail.count_views)}
								</span>

								<img width={28} height={22} src={eye} alt='' />
							</div>
							<div className={style.wrapperCountViews}>
								<span>
									{ConvertIntToRUNumberFormat(elementDetail.selected)}
								</span>
								<img width={28} height={22} src={favorite} alt='' />
							</div>
						</div>
						<PriceDefaultBlock data={elementDetail} />
						<PriceHotBlock element={elementDetail} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default GridDetailChannels
