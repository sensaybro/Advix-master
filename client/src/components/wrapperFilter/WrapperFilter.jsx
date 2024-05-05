import AddChannelBtn from './AddChannelBtn/AddChannelBtn'
import style from './WrapperFilter.module.scss'
const WrapperFilter = () => {
	return (
		<div className={style.wrapperFilter}>
			<AddChannelBtn />
		</div>
	)
}

export default WrapperFilter
