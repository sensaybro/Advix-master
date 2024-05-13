import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import eye from '../../../assets/eye.svg'
import favorite from '../../../assets/favorite.svg'
import favorited from '../../../assets/favorited.svg'
import userIcon from '../../../assets/person.svg'
import price from '../../../assets/price.svg'
import priceCMP from '../../../assets/priceCPM.svg'
import style from './ChannelComponent.module.scss'
const ChannelComponent = ({ element }) => {
	const [clicked, setClicked] = useState(false)
	const [indexY, setIndexY] = useState(0)
	const [clickedTypePrice, setClickedTypePrice] = useState({
		24: false,
		48: false,
		72: false,
		0: false,
		1: false,
		2: false,
	})

	const handleClickedTypePrice = (key, index) => {
		setClickedTypePrice(prevState => {
			setIndexY(index)
			// Сначала создаем новый объект состояния, где все ключи устанавливаются в false
			let newState = {
				24: false,
				48: false,
				72: false,
				0: false,
				1: false,
				2: false,
			}
			// Устанавливаем значение true только для кнопки, на которую был сделан клик
			newState[key] = true
			return newState
		})
	}
	function truncateText(text, maxLength) {
		if (text.length <= maxLength) {
			return text
		}
		const truncatedText = text.substring(0, maxLength).trim()
		return truncatedText + '...'
	}

	const handleClickedFavorite = () => {
		setClicked(!clicked)
	}
	const ConvertIntToRUPercent = among => {
		return new Intl.NumberFormat('ru', { style: 'percent' }).format(among)
	}
	const ConvertIntToRUNumberFormat = among => {
		return new Intl.NumberFormat('ru', { style: 'decimal' }).format(among)
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
						<img
							className={style.borderRadius}
							width={310}
							height={79}
							src={element.url_background_channel}
							alt=''
							srcset=''
						/>
					</div>

					<div className={style.wrapperImgAndDesc}>
						<Link to={`/channels/${element.id}`}>
							<img
								width={85}
								height={85}
								src={element.url_Image_Channel}
								alt=''
								srcset=''
							/>
						</Link>

						<div>
							<h2 className={style.wrapperNameAndPosition}>
								<Link to={`/channels/${element.id}`}>
									{element.name_channel}
								</Link>
							</h2>
							<div>
								<span className={style.bordedElement}>{element.Category}</span>
								<span className={style.bordedElement}>#{element.position}</span>
							</div>
						</div>
					</div>
				</div>

				<div className={style.wrapperDescChannel}>
					<div className={style.wrapperQuotes}>
						<span className={style.quotesStyle}>
							{truncateText(element.desc_channel, 30)}
						</span>
					</div>
					<div className={style.wrapperStatistics}>
						<div className={style.pairStatistics}>
							<div className={style.wrapperOneStatistics}>
								<div>
									<img
										className={style.wrapperImageIcon}
										width={15}
										height={15}
										src={userIcon}
										alt=''
									/>
								</div>
								<span>
									<strong>
										{ConvertIntToRUNumberFormat(element.count_subscribers)}{' '}
									</strong>
									подписчиков
								</span>
							</div>
							<div>
								<img
									className={style.wrapperImageIcon}
									width={15}
									height={15}
									src={eye}
									alt=''
								/>
								<span>
									<strong>
										{ConvertIntToRUNumberFormat(element.count_views)}
									</strong>{' '}
									просмотров на пост
								</span>
							</div>
						</div>
						<div className={style.pairStatistics}>
							<div>
								<img
									className={style.wrapperImageIcon}
									width={15}
									height={15}
									src={priceCMP}
									alt=''
								/>
								<span>
									<strong>{ConvertIntToRUNumberFormat(element.CPM)}</strong> CPM
								</span>
							</div>
							<div>
								<img
									className={style.wrapperImageIcon}
									width={15}
									height={15}
									src={price}
									alt=''
								/>
								<span>
									<strong>{ConvertIntToRUPercent(element.ERR)}</strong> ERR
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
						{element.priceObjects[indexY].price.toLocaleString('ru-RU', {
							style: 'currency',
							currency: 'RUB',
							minimumFractionDigits: 0,
						})}
					</span>
				</div>
			</div>
			<div className={style.priceType}>
				{element.priceObjects.map(
					(time, index) =>
						time.hot === false && (
							<button
								key={index}
								className={
									clickedTypePrice[time.time]
										? style.clickedBtn
										: style.nonClickedButton
								}
								onClick={() => handleClickedTypePrice(time.time, index)}
							>
								{time.time === 24 && '1/24'}
								{time.time === 48 && '1/48'}
								{time.time === 72 && '1/72'}
								{time.time === 0 && 'натив'}
								{time.time === 1 && 'репост'}
								{time.time === 2 && 'б/уд'}
								{time.hot_date}
							</button>
						)
				)}
			</div>
			<button className={style.BtnBuy}>
				<span>КУПИТЬ</span>
			</button>
			<button className={style.BtnFollowing}>
				<span>ОТПИСАТЬСЯ ОТ ГОРЯЩИХ ❌</span>
			</button>
		</div>
	)
}

export default ChannelComponent
