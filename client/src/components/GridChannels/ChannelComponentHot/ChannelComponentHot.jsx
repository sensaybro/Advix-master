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
		const current = new Date()
		const date2 = new Date(data)
		const timeDifference = Math.floor(
			(date2.getTime() - current.getTime()) / 1000
		)

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
		firstDifference(toFindHotPriceDate(element))
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
		const a = getForHot()[0].price
		const b = getHot()[0].price
		const d = a - b
		const x = (d * 100) / a
		return Math.round(x)
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
	const formatData = somedate => {
		const updatedFormatData = new Date(somedate)
		return updatedFormatData
	}
	const TimeDifferenceOne = ({ hotDate }) => {
		console.log('hotdate', hotDate)
		let updatedData = formatData(hotDate)
		const [currentTime, setCurrentTime] = useState(new Date())

		useEffect(() => {
			const interval = setInterval(() => {
				setCurrentTime(new Date())
			}, 1000)

			return () => clearInterval(interval)
		}, [])

		// Проверяем, является ли время отрицательным
		const timeDifference = Math.floor(
			(updatedData.getTime() - currentTime.getTime()) / 1000
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
	const toFindHotPriceDate = element => {
		let HotObject = {}
		element.priceObjects.forEach(element => {
			if (typeof element.hot_date == 'string') {
				HotObject = element
				return element
			}
		})
		console.log(HotObject)
		return HotObject.hot_date
	}

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
								className={style.wrapperFavoriteImg}
								src={!clicked ? favorite : favorited}
								alt=''
							/>
						</button>
						<div className={style.wrapperBackgroundImage}>
							<img src={element.url_background_channel} alt='' srcset='' />
						</div>

						<div className={style.wrapperImgAndDesc}>
							<Link to={`/channels/${element.id}`}>
								<img
									src={`${process.env.REACT_APP_API_KEY}/chat_parser/${element.url_Image_Channel}`}
									alt='img channel'
								/>
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
									<img className={style.wrapperImageIcon} src={eye} alt='' />
									<span>
										<strong>{ConvertIntToRUNumberFormat(element.views)}</strong>{' '}
										просмотров на пост
									</span>
								</div>
							</div>
							<div className={style.pairStatistics}>
								<div>
									<img
										className={style.wrapperImageIcon}
										src={priceCMP}
										alt=''
									/>
									<span>
										<strong>{ConvertIntToRUNumberFormat(element.CPM)}</strong>{' '}
										CPM
									</span>
								</div>
								<div>
									<img className={style.wrapperImageIcon} src={price} alt='' />
									<span>
										<strong>{ConvertIntToRUPercent(element.ERR)}</strong> ERR
									</span>
								</div>
							</div>
						</div>
						<div></div>
						<div>
							{/* {element.hot_price !== 0 && <span>{element.hot_price}</span>}
							{element.hot_price === 0 ? element.price : element.hot_price} */}
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
							{Number(filtredDefaultPrice[0].price).toLocaleString('ru-RU', {
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
								.map(element => Number(element.price))
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
											{time.hot_date &&
												formatData(time.hot_date).toLocaleTimeString('ru-RU', {
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
											{time.hot_date &&
												formatData(time.hot_date).toLocaleTimeString('ru-RU', {
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
						<TimeDifferenceOne hotDate={toFindHotPriceDate(element)} />
					</div>
				</div>
			</div>
		)
	)
}

export default ChannelComponentHot
