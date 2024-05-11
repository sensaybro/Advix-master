import newBackground from '../../../assets/background_example.png'
import not_rounded from '../../../assets/not_rounded.png'
const date = new Date('2024-6-10')
date.setUTCHours(12, 0, 0, 0)
const dateCurrently = new Date()
export const data = [
	{
		id: 20,
		User_id: 3445465,
		Category: 'SMM и маркетинг1',
		language: 'русский',
		id_telegram: -45456567,
		desc_channel:
			'Отличный канал! Условия в ЛС! Постоянно на закупах!  Не рекламируем: ставки. К постам кнопки не добавляем! Моментальное подтверждение!',
		link_Cannel: 'https://t.me/gdf5455gh',
		link_Type_Boolean: true,
		name_channel: 'Test: новости',
		url_Image_Channel: not_rounded,
		url_background_channel: newBackground,
		public_type: true,
		count_subscribers: 5257,
		count_views: 99912,
		ERR: 0.25,
		selected: 200,
		position: 2,

		priceObjects: [
			{
				price: 80000,
				time: 24,
				hot: false,
				for_hot: true,
			},
			{
				price: 90000,
				time: 48,
				hot: false,
				for_hot: false,
			},
			{
				price: 120000,
				time: 72,
				hot: false,
				for_hot: false,
			},
			{
				price: 70000,
				time: 24,
				hot: true,
				hot_date: date,
				currently_date: dateCurrently,
			},
		],
		CPM: 100,
		// default_time_day: [24, 72, 2],
		// hot_price: 19990,
		hot_state: true,
	},
]
