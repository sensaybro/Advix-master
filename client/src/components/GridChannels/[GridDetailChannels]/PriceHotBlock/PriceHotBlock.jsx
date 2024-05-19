import { React, useEffect, useState } from 'react'

import style from './PriceHotBlock.module.scss'
const PriceHotBlock = ({ element }) => {
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
		const dataFormated = new Date(data)
		const timeDifference = Math.floor(
			(dataFormated.getTime() - current.getTime()) / 1000
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
	const formatData = somedate => {
		const updatedFormatData = new Date(somedate)
		return updatedFormatData
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

	const TimeDifferenceOne = ({ hotDate }) => {
		const date2 = new Date(hotDate)
		const [currentTime, setCurrentTime] = useState(new Date())

		useEffect(() => {
			const interval = setInterval(() => {
				setCurrentTime(new Date())
			}, 1000)

			return () => clearInterval(interval)
		}, [])

		// Проверяем, является ли время отрицательным
		const timeDifference = Math.floor(
			(date2.getTime() - currentTime.getTime()) / 1000
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
	const findHotTime = priceObjects => {
		let HotElement = {}
		priceObjects.map(element => {
			if (element.hot === true) {
				HotElement = element
				return
			}
		})
		return HotElement.hot_date
	}
	return (
		<div className={style.wrapperRootHotPrice}>
			<div className={style.wrapperTitleHot}>
				<span>ГОРЯЩЕЕ ПРЕДЛОЖЕНИЕ 🔥</span>
			</div>
			<div>
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
				<div className={style.wrapperDefaultPriceUnderline}>
					<span className={style.wrapperDiscPrice}>
						{Number(filtredDefaultPrice[0].price).toLocaleString('ru-RU', {
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
										{formatData(time.hot_date).toLocaleDateString('ru-RU', {
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
										{formatData(time.hot_date).toLocaleTimeString('ru-RU', {
											hour: 'numeric',
											minute: 'numeric',
										})}
									</span>
								</button>
							)
					)}
				</div>
			</div>
			<div className={style.wrapperBtnHot}>
				<button className={style.BtnBuy}>
					<span>КУПИТЬ СО СКИДКОЙ</span>
				</button>
			</div>
			<div className={style.wrapperDiscountTime}>
				<div className={style.TimeAndDiscount}>
					<div className={style.wrapperFormulaDis}>{formulaDiscount()}%</div>
					<div className={style.TimeBuy}>
						ОСТАЛОСЬ
						<TimeDifferenceOne hotDate={findHotTime(element.priceObjects)} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default PriceHotBlock
