import React from 'react'
import { useParams } from 'react-router-dom'

const ChannelDetail = () => {
	const data = useParams()
	console.log(data)
	return <div>ChannelDetail</div>
}

export default ChannelDetail
