import { useParams } from 'react-router-dom'
import { data } from '../ChannelComponent/FakeData'
import Button from './Button/Button'
import style from './GridDetailChannels.module.scss'
import LinkChannel from './LinkChannel/LinkChannel'

const GridDetailChannels = () => {
	const { id } = useParams()

	const result = data.filter(element => {
		return element.id == id
	})
	console.log(result)
	return (
		<div className={style.wrapperGridDetailChannels}>
			<Button />
			<LinkChannel url={result[0].link_Cannel} />
		</div>
	)
}

export default GridDetailChannels
