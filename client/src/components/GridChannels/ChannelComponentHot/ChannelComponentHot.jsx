import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import eye from '../../../assets/eye.svg'
import favorite from '../../../assets/favorite.svg'
import favorited from '../../../assets/favorited.svg'
import userIcon from '../../../assets/person.svg'
import price from '../../../assets/price.svg'
import priceCMP from '../../../assets/priceCPM.svg'
import style from './ChannelComponentHot.module.scss'
const ChannelComponentHot = ({ element }) => {
	const [clicked, setClicked] = useState(false)
	const [timer, setTimer] = useState(0)
	const [counter, setCounter] = useState(false)
	const [clickedTypePrice, setClickedTypePrice] = useState({
		24: false,
		48: false,
		72: false,
		0: false,
		1: false,
		2: false,
	})
	const firstDifference = data => {
		console.log('data', data.getTime())
		const current = new Date()
		console.log('current', current.getTime())
		const timeDifference = Math.floor(
			(data.getTime() - current.getTime()) / 1000
		)
		console.log('rimwe', timeDifference)
		setTimer(timeDifference)
	}
	const checkForHot = () => {
		element.priceObjects.filter(element => {
			if (element.for_hot === true) {
				setCounter(true)
			}
		})
	}
	useEffect(() => {
		firstDifference(element.priceObjects[3].hot_date)
		checkForHot()
	}, [])

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
	const ConvertIntToRUPercent = among => {
		return new Intl.NumberFormat('ru', { style: 'percent' }).format(among)
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

	//element.priceObjects[3].hot_date

	const TimeDifferenceOne = ({ hotDate }) => {
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
	function truncateText(text, maxLength) {
		if (text.length <= maxLength) {
			return text
		}
		const truncatedText = text.substring(0, maxLength).trim()
		return truncatedText + '...'
	}
	const ConvertIntToRUNumberFormat = among => {
		return new Intl.NumberFormat('ru', { style: 'decimal' }).format(among)
	}
	const filtredDefaultPrice = element.priceObjects.filter(element => {
		return element.for_hot === true
	})

	return (
		counter &&
		timer > 0 && (
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
							<img src={element.url_background_channel} alt='' srcset='' />
						</div>

						<div className={style.wrapperImgAndDesc}>
							<Link to={`/channels/${element.id}`}>
								<img src={element.url_Image_Channel} alt='' srcset='' />
							</Link>

							<div>
								<Link to={`/channels/${element.id}`}>
									<h2>{element.name_channel}</h2>
								</Link>

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
										<strong>{ConvertIntToRUNumberFormat(element.CPM)}</strong>{' '}
										CPM
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
					<hr className={style.Line} color='#e1e5e8' />
					<div className={style.wrapperDefaultPriceUnderline}>
						<span>
							{filtredDefaultPrice[0].price.toLocaleString('ru-RU', {
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
								time.for_hot === true && (
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
						<TimeDifferenceOne hotDate={element.priceObjects[3].hot_date} />
					</div>
				</div>
			</div>
		)
	)
}

export default ChannelComponentHot
