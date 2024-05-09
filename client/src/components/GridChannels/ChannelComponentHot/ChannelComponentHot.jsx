import React, { useEffect, useState } from 'react'
import eye from '../../../assets/eye.svg'
import favorite from '../../../assets/favorite.svg'
import favorited from '../../../assets/favorited.svg'
import userIcon from '../../../assets/person.svg'
import price from '../../../assets/price.svg'
import priceCMP from '../../../assets/priceCPM.svg'
import style from './ChannelComponentHot.module.scss'
const ChannelComponentHot = ({ element }) => {
	const [clicked, setClicked] = useState(false)
	const [timer, setTimer] = useState()
	const [clickedTypePrice, setClickedTypePrice] = useState({
		24: false,
		48: false,
		72: false,
		0: false,
		1: false,
		2: false,
	})
	const getForHot = () => {
		return element.priceObjects.filter(element => {
			return element.for_hot === true
		})
	}
	const getHot = () => {
		return element.priceObjects.filter(element => {
			return element.hot === true
		})
	}
	const formulaDiscount = () => {
		console.log(getHot()[0])
		const a = getForHot()[0].price
		const b = getHot()[0].price
		const d = a - b
		const x = (d * 100) / a
		return x
	}

	const handleClickedTypePrice = key => {
		setClickedTypePrice(prevState => {
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

	const TimeDifference = ({ hotDate }) => {
		const [currentTime, setCurrentTime] = useState(new Date())

		useEffect(() => {
			const interval = setInterval(() => {
				setCurrentTime(new Date())
			}, 1000)

			return () => clearInterval(interval)
		}, [])

		// Проверяем, является ли время отрицательным
		const timeDifference = Math.floor(
			(hotDate.getTime() - currentTime.getTime()) / 1000
		)
		setTimer(timeDifference)
		// if (timeDifference < 0) {
		// 	return null // Если время отрицательное, не отображаем компонент
		// }

		const hours = Math.floor(timeDifference / 3600)
		const minutes = Math.floor((timeDifference % 3600) / 60)
		const seconds = Math.floor(timeDifference % 60)

		return <div>{`${hours}:${minutes}:${seconds}`}</div>
	}
	const handleClickedFavorite = () => {
		setClicked(!clicked)
	}

	{
		!timer < 0 && (
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
						<div className={style.wrapperBackgroundImage}>
							<img
								width={302}
								src={element.url_background_channel}
								alt=''
								srcset=''
							/>
						</div>

						<div className={style.wrapperImgAndDesc}>
							<img src={element.url_Image_Channel} alt='' srcset='' />
							<div>
								<h2>{element.name_channel}</h2>
								<div>
									<span className={style.bordedElement}>
										{element.Category}
									</span>
									<span className={style.bordedElement}>
										#{element.position}
									</span>
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
					<div className={style.wrapperDefaultPriceUnderline}>
						<span>
							{element.priceObjects[0].price.toLocaleString('ru-RU', {
								style: 'currency',
								currency: 'RUB',
								minimumFractionDigits: 0,
							})}
						</span>
					</div>
					<div className={style.wrapperDefaultPrice}>
						<span>
							{element.priceObjects
								.filter(element => element.hot === true)
								.map(element => element.price)
								.toLocaleString('ru-RU', {
									style: 'currency',
									currency: 'RUB',
									minimumFractionDigits: 0,
								})}
						</span>
					</div>
				</div>
				<div className={style.wrapperTypePrice}>
					<div className={style.priceType}>
						{element.priceObjects.map(
							(time, index) =>
								time.hot === true && (
									<button
										key={index}
										className={style.clickedBtn}
										//	onClick={() => handleClickedTypePrice(time)}
									>
										<span>
											{time.time === 24 && '1/24'}
											{time.time === 48 && '1/48'}
											{time.time === 72 && '1/72'}
											{time.time === 0 && 'натив'}
											{time.time === 1 && 'репост'}
											{time.time === 2 && 'б/уд'}
										</span>
									</button>
								)
						)}
					</div>
					<div className={style.priceType}>
						{element.priceObjects.map(
							(time, index) =>
								time.hot === true && (
									<button
										key={index}
										className={style.clickedBtn}
										onClick={() => handleClickedTypePrice(time)}
									>
										<span>
											{time.hot_date.toLocaleDateString('ru-RU', {
												month: 'long',
												day: 'numeric',
											})}
										</span>
									</button>
								)
						)}
					</div>
					<div className={style.priceType}>
						{element.priceObjects.map(
							(time, index) =>
								time.hot === true && (
									<button
										key={index}
										className={style.clickedBtn}
										onClick={() => handleClickedTypePrice(time)}
									>
										<span>
											{time.hot_date.toLocaleTimeString('ru-RU', {
												hour: 'numeric',
												minute: 'numeric',
											})}
										</span>
									</button>
								)
						)}
					</div>
				</div>
				<button className={style.BtnBuy}>
					<span>КУПИТЬ СО СКИДКОЙ</span>
				</button>
				<div className={style.TimeAndDiscount}>
					<div className={style.wrapperFormulaDis}>{formulaDiscount()}%</div>
					<div className={style.TimeBuy}>
						<TimeDifference hotDate={element.priceObjects[1].hot_date} />
					</div>
				</div>
			</div>
		)
	}
}

export default ChannelComponentHot
