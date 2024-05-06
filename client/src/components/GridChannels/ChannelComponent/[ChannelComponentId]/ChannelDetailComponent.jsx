import React from 'react'
import { useParams } from 'react-router-dom'
const ChannelDetailComponent = () => {
	const data = useParams()
	console.log(data)
	return <div>ChannelDetailComponent</div>
}

export default ChannelDetailComponent
