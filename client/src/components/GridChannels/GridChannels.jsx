import DropDown from '../DropDown/DropDown'
import Search from '../InputSearch/Search'
import style from './GridChannels.module.scss'

const GridChannels = () => {
	const args = [
		'Стоимость',
		'CPM',
		'Подписчики',
		'Просмотры на пост',
		'Вовлеченность (ERR)',
		'Рейтинг',
		'Отзывы',
	]
	const default_arg = 'Без сортировки'
	return (
		<div className={style.wrapperGrid}>
			<Search />
			<DropDown default_arg={default_arg} args={args} />
		</div>
	)
}

export default GridChannels
