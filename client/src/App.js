import React, { useEffect } from 'react'

function App() {
	async function setWebhook() {
		try {
			const response = await fetch(
				'https://bb35-103-125-235-24.ngrok-free.app/setWebhook',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						url: 'https://bb35-103-125-235-24.ngrok-free.app/webhook',
					}),
				}
			)

			const data = await response.json()
			console.log(data)
		} catch (error) {
			console.error('Ошибка при установке вебхука:', error)
		}
	}

	useEffect(() => {
		setWebhook()
	}, [])

	return <div className='App'>{/* Ваше React-приложение */}</div>
}

export default App
