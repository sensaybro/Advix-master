import Filter from '../Filter/Filters'
import AddChannelBtn from './AddChannelBtn/AddChannelBtn'
import style from './WrapperFilter.module.scss'
const WrapperFilter = () => {
	return (
		<div className={style.wrapperFilter}>
			<AddChannelBtn />
			<Filter />
		</div>
	)
}

export default WrapperFilter
