import { useParams } from 'react-router-dom'
import { data } from '../ChannelComponent/FakeData'
import Button from './Button/Button'
import style from './GridDetailChannels.module.scss'
import InfoAboutPublic from './InfoAboutPublic/InfoAboutPublic'
import LinkChannel from './LinkChannel/LinkChannel'

const GridDetailChannels = () => {
	const { id } = useParams()

	const result = data.filter(element => {
		return element.id == id
	})
	const elementDetail = result[0]
	console.log(elementDetail.public_type)
	return (
		<div className={style.wrapperGridDetailChannels}>
			<Button />
			<div className={style.wrapperLinkAndInfoAbout}>
				<InfoAboutPublic type_public={elementDetail.public_type} />
				<LinkChannel url={elementDetail.link_Cannel} />
			</div>
			<div>
				<img
					className={style.ImgBackground}
					width={1718}
					height={254}
					src={elementDetail.url_background_channel}
					alt='background_channel_image'
				/>
			</div>
		</div>
	)
}

export default GridDetailChannels
