import React, { useEffect, useState } from 'react'

import icoVerify from '../../assets/icons/check_verify.svg'
import icoHeartStroke from '../../assets/icons/favorite.svg'
import icoHeart from '../../assets/icons/favorite_heart.svg'
import icoFilter from '../../assets/icons/filter.svg'
import icoLock from '../../assets/icons/lock_open.svg'
import icoReload from '../../assets/icons/reload.svg'
import icoSave from '../../assets/icons/save.svg'
import { data } from '../GridChannels/ChannelComponent/FakeData.js'
import style from './Filters.module.scss'

import DropDown from '../DropDownFilt/DropDownFilt'

function Filter() {
	const categoryList = [
		'Telegram',
		'Новости и СМИ',
		'Литература',
		'Криптовалюта',
		'Искусство',
		'Путешествия',
		'Юмор и приколы',
	]
	const default_argCategory = 'Не выбрано'

	const langList = ['Русский', 'Английский', 'Арабский']
	const default_argLang = 'Не выбрано'
	const ConvertIntToRUPercent = among => {
		return new Intl.NumberFormat('ru', { style: 'percent' }).format(among)
	}

	// For block-2 and block-3
	const [filters, setFilters] = useState({
		price: { min: null, max: null },
		cpm: { min: null, max: null },
		subscribers: { min: null, max: null },
		views: { min: null, max: null },
		err: { min: null, max: null },
	})
	const minCost = 0
	const maxCost = 100000

	useEffect(() => {
		Object.keys(filters).forEach(key => {
			updateRange(key)
		})
	}, [])

	const updateRange = key => {
		let values
		if (key === 'price') {
			values = data.map(item => item.default_price)
		} else if (key === 'cpm') {
			values = data.map(item => item.CPM)
		} else if (key === 'subscribers') {
			values = data.map(item => item.count_subscribers)
		} else if (key === 'views') {
			values = data.map(item => item.count_views)
		} else if (key === 'err') {
			values = data.map(item => ConvertIntToRUPercent(item.ERR))
		}
		const min = Math.min(...values)
		const max = Math.max(...values)
		setFilters(prevFilters => ({ ...prevFilters, [key]: { min, max } }))
	}

	const handleRangeChange = (key, field) => event => {
		const value = event.target.value
		setFilters(prevFilters => ({
			...prevFilters,
			[key]: {
				...prevFilters[key],
				[field]: value,
			},
		}))
	}

	const handleReload = key => () => {
		updateRange(key)
	}

	// For block-4 and block-5
	const [like, setLike] = useState(false)
	const [online, setOnline] = useState(false)
	const [open, setOpen] = useState(false)
	const [verify, setVerify] = useState(false)
	const [check, setCheck] = useState(false)

	// Обработчики изменения состояний радио-кнопок
	const handleLikeChange = () => {
		setLike(!like)
	}
	// useEffect(()=>{
	// 	setLike(!like)
	// },[like])
	const handleOnlineChange = () => setOnline(!online)
	const handleOpenChange = () => setOpen(!open)
	const handleVerifyChange = () => setVerify(!verify)
	const handleCheckChange = () => setCheck(!check)

	// Обработчики для кнопок "Сохранить поиск" и "Восстановить поиск"
	const handleSaveSearch = () => {
		// Действия при нажатии на кнопку "Сохранить поиск"
	}

	const handleRestoreSearch = () => {
		// Действия при нажатии на кнопку "Восстановить поиск"
	}

	return (
		<div className={style.filter}>
			<div className={style.filter_wrapper}>
				{/*=========== Block 1 ===========*/}
				<div className={style.filter_block}>
					<div className={style.filter_item}>
						<span>Категория канала</span>
						<DropDown default_arg={default_argCategory} args={categoryList} />
					</div>

					<div className={style.filter_item}>
						<span>Язык канала</span>
						<DropDown
							className={style.drop_down_lang}
							default_arg={default_argLang}
							args={langList}
						/>
					</div>
				</div>

				{/*=========== Block 2 ===========*/}
				<div className={style.filter_block}>
					<div className={style.filter_item}>
						<span>Стоимость</span>

						<div className={style.filter_content}>
							<label className={style.label_wrapper}>
								<span>от</span>
								<input
									type='number'
									min={minCost}
									max={maxCost}
									value={filters.price.min !== null ? filters.price.min : ''}
									onChange={handleRangeChange('price', 'min')}
								/>
							</label>
							<label className={style.label_wrapper}>
								<span>до</span>
								<input
									type='number'
									min={minCost}
									max={maxCost}
									value={filters.price.max || ''}
									onChange={handleRangeChange('price', 'max')}
								/>
							</label>

							<button
								className={style.reload_btn}
								onClick={handleReload('price')}
							>
								<img src={icoReload} alt='' />
							</button>
						</div>
					</div>

					<div className={style.filter_item}>
						<span>CPM</span>

						<div className={style.filter_content}>
							<label className={style.label_wrapper}>
								<span>от</span>
								<input
									type='number'
									min={minCost}
									max={maxCost}
									value={filters.cpm.min || ''}
									onChange={handleRangeChange('cpm', 'min')}
								/>
							</label>
							<label className={style.label_wrapper}>
								<span>до</span>
								<input
									type='number'
									min={minCost}
									max={maxCost}
									value={filters.cpm.max || ''}
									onChange={handleRangeChange('cpm', 'max')}
								/>
							</label>

							<button
								className={style.reload_btn}
								onClick={handleReload('cpm')}
							>
								<img src={icoReload} alt='' />
							</button>
						</div>
					</div>
				</div>

				{/*=========== Block 3 ===========*/}
				<div className={style.filter_block}>
					<div className={style.filter_item}>
						<span>Подписчиков</span>

						<div className={style.filter_content}>
							<label className={style.label_wrapper}>
								<span>от</span>
								<input
									type='number'
									min={minCost}
									max={maxCost}
									value={filters.subscribers.min || ''}
									onChange={handleRangeChange('subscribers', 'min')}
								/>
							</label>
							<label className={style.label_wrapper}>
								<span>до</span>
								<input
									type='number'
									min={minCost}
									max={maxCost}
									value={filters.subscribers.max || ''}
									onChange={handleRangeChange('subscribers', 'max')}
								/>
							</label>

							<button
								className={style.reload_btn}
								onClick={handleReload('subscribers')}
							>
								<img src={icoReload} alt='' />
							</button>
						</div>
					</div>

					<div className={style.filter_item}>
						<span>Просмотров на пост</span>

						<div className={style.filter_content}>
							<label className={style.label_wrapper}>
								<span>от</span>
								<input
									type='number'
									min={minCost}
									max={maxCost}
									value={filters.views.min || ''}
									onChange={handleRangeChange('views', 'min')}
								/>
							</label>
							<label className={style.label_wrapper}>
								<span>до</span>
								<input
									type='number'
									min={minCost}
									max={maxCost}
									value={filters.views.max || ''}
									onChange={handleRangeChange('views', 'max')}
								/>
							</label>

							<button
								className={style.reload_btn}
								onClick={handleReload('views')}
							>
								<img src={icoReload} alt='' />
							</button>
						</div>
					</div>

					<div className={style.filter_item}>
						<span>Вовлеченность (ERR)</span>

						<div className={style.filter_content}>
							<label className={style.label_wrapper}>
								<span>от</span>
								<input
									type='number'
									min={minCost}
									max={maxCost}
									value={filters.err.min || ''}
									onChange={handleRangeChange('err', 'min')}
								/>
							</label>
							<label className={style.label_wrapper}>
								<span>до</span>
								<input
									type='number'
									min={minCost}
									max={maxCost}
									value={filters.err.max || ''}
									onChange={handleRangeChange('err', 'max')}
								/>
							</label>

							<button
								className={style.reload_btn}
								onClick={handleReload('err')}
							>
								<img src={icoReload} alt='' />
							</button>
						</div>
					</div>
				</div>

				{/*=========== Block 4 ===========*/}
				<div className={style.filter_block}>
					<div className={style.wrapper_radio_btn}>
						<input
							type='radio'
							id='like'
							checked={like}
							onClick={handleLikeChange}
						/>
						<label for='like' className={style.label_radio}>
							В избранном
							<img src={icoHeart} alt='' />
						</label>
					</div>

					<div className={style.wrapper_radio_btn}>
						<input
							type='radio'
							id='online'
							checked={online}
							onClick={handleOnlineChange}
						/>
						<label for='online' className={style.label_radio}>
							Администратор онлайн
							<div className={style.round}></div>
						</label>
					</div>

					<div className={style.wrapper_radio_btn}>
						<input
							type='radio'
							id='open'
							checked={open}
							onClick={() => setOpen(!open)}
						/>
						<label for='open' className={style.label_radio}>
							Открытый канал
							<img src={icoLock} alt='' />
						</label>
					</div>

					<div className={style.wrapper_radio_btn}>
						<input
							type='radio'
							id='verify'
							checked={verify}
							onClick={handleVerifyChange}
						/>
						<label for='verify' className={style.label_radio}>
							Верифицированный канал
							<img src={icoVerify} alt='' />
						</label>
					</div>

					<div className={style.wrapper_radio_btn}>
						<input
							type='radio'
							id='check'
							checked={check}
							onClick={handleCheckChange}
						/>
						<label for='check' className={style.label_radio}>
							Проверенный канал
						</label>
					</div>
				</div>

				{/*=========== Block 5 ===========*/}
				<div className={style.wrapper_search}>
					<button className={style.btn_search} onClick={handleSaveSearch}>
						<img src={icoHeartStroke} alt='' />
						Сохранить поиск
					</button>

					<button className={style.btn_search} onClick={handleRestoreSearch}>
						<img src={icoSave} alt='' />
						Восстановить поиск
					</button>
				</div>
			</div>
			<img className={style.filter_ico} src={icoFilter} alt='filter' />
		</div>
	)
}

export default Filter
