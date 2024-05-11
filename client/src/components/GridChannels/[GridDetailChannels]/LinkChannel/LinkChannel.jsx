import style from './LinkChannel.module.scss'
const LinkChannel = ({ url }) => {
	return (
		<div className={style.wrapperLinkChannel}>
			<a target='_blank' href={url}>
				{url}
			</a>
		</div>
	)
}

export default LinkChannel
