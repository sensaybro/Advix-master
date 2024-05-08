import style from './LinkChannel.module.scss'
const LinkChannel = ({ url }) => {
	return <div className={style.wrapperLinkChannel}>{url}</div>
}

export default LinkChannel
