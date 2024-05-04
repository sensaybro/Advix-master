import React, { useState } from 'react'
import eye from '../../../assets/eye.svg'
import favorite from '../../../assets/favorite.svg'
import favorited from '../../../assets/favorited.svg'
import userIcon from '../../../assets/person.svg'
import price from '../../../assets/price.svg'
import priceCMP from '../../../assets/priceCPM.svg'
import style from './ChannelComponent.module.scss'
const ChannelComponent = ({ element }) => {
	const [clicked, setClicked] = useState(false)
	const handleClickedFavorite = () => {
		setClicked(!clicked)
	}
	return (
		<div className={style.wrapperChannelComponent}>
			<div className={style.wrapperComponent}>
				<div className={style.wrapperImg}>
					<button
						onClick={handleClickedFavorite}
						className={style.wrapperFavorite}
					>
						<img
							width={18}
							height={17}
							src={!clicked ? favorite : favorited}
							alt=''
						/>
					</button>
					<div>
						<img src={element.url_background_channel} alt='' srcset='' />
					</div>

					<div className={style.wrapperImgAndDesc}>
						<img src={element.url_Image_Channel} alt='' srcset='' />
						<div>
							<h2>{element.name_channel}</h2>
							<div>
								<span className={style.bordedElement}>{element.Category}</span>
								<span className={style.bordedElement}>#{element.position}</span>
							</div>
						</div>
					</div>
				</div>

				<div className={style.wrapperDescChannel}>
					<div className={style.wrapperQuotes}>
						<span className={style.quotesStyle}>{element.desc_channel}</span>
					</div>
					<div className={style.wrapperStatistics}>
						<div className={style.pairStatistics}>
							<div className={style.wrapperOneStatistics}>
								<div>
									<img width={15} height={15} src={userIcon} alt='' />
								</div>
								<span>
									<strong>{element.count_subscribers} </strong>подписчиков
								</span>
							</div>
							<div>
								<img width={15} height={15} src={eye} alt='' />
								<span>
									<strong>{element.count_views}</strong> просмотров на пост
								</span>
							</div>
						</div>
						<div className={style.pairStatistics}>
							<div>
								<img width={15} height={15} src={priceCMP} alt='' />
								<span>
									<strong>{element.CPM}</strong> CPM
								</span>
							</div>
							<div>
								<img width={15} height={15} src={price} alt='' />
								<span>
									<strong>{element.ERR}%</strong> ERR
								</span>
							</div>
						</div>
					</div>
					<div></div>
					<div>
						{element.hot_price !== 0 && <span>{element.hot_price}</span>}
						{element.hot_price === 0 ? element.price : element.hot_price}
					</div>
				</div>
				<div className={style.forFutureFeatures}>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<hr color='#e1e5e8' />
				<div className={style.wrapperDefaultPrice}>
					<span>
						{element.default_price.toLocaleString('ru-RU', {
							style: 'currency',
							currency: 'RUB',
							minimumFractionDigits: 0,
						})}
					</span>
				</div>
			</div>
		</div>
	)
}

export default ChannelComponent
