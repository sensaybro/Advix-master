import { useState } from 'react'
import style from './PriceDefaultBlock.module.scss'
const PriceDefaultBlock = ({ data }) => {
	console.log('data', data)
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
	return (
		<div className={style.wrapperRootPriceSwitcher}>
			<div className={style.wrapperTitle}>
				<span>КУПИТЬ РЕКЛАМУ</span>
			</div>
			<div className={style.wrapperDefaultPrice}>
				<span>
					{Number(data.priceObjects[indexY].price).toLocaleString('ru-RU', {
						style: 'currency',
						currency: 'RUB',
						minimumFractionDigits: 0,
					})}
				</span>
			</div>
			<div className={style.wrapperPriceType}>
				<div className={style.priceType}>
					{data.priceObjects.map(
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
			</div>
			<div className={style.wrapperByBtn}>
				<button className={style.BtnBuy}>
					<span>КУПИТЬ</span>
				</button>
			</div>
			<button className={style.wrapperHotTitle}>
				<span>ПОДПИСАТЬСЯ НА ГОРЯЩИЕ 🔥</span>
			</button>
		</div>
	)
}

export default PriceDefaultBlock
