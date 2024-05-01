import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/login' element={<Login />} />
			</Routes>
		</>
	)
}

export default App
