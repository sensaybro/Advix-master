import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Channels from './components/Channels/Channels'
import ChannelDetailComponent from './components/GridChannels/ChannelComponent/[ChannelComponentId]/ChannelDetailComponent'
import MainLayout from './components/HeaderOutlet/MainLayout'

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='/channels' element={<Channels />} />
					<Route path='/channels/:id' element={<ChannelDetailComponent />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
