import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Channels from './components/Channels/Channels'
import GridDetailChannels from './components/GridChannels/[GridDetailChannels]/GridDetailChannels'
import MainLayout from './components/HeaderOutlet/MainLayout'

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='/channels' element={<Channels />} />
					<Route path='/channels/:id' element={<GridDetailChannels />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
