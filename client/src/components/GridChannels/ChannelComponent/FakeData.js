import img from '../../../assets/advix_photo.png'
import newImg from '../../../assets/avatar_example.png'
import background from '../../../assets/background_advix.png'
import newBackground from '../../../assets/background_example.png'
const date = new Date('2024-5-8')
date.setUTCHours(9, 0, 0, 0)
const dateCurrently = new Date()
export const data = [
	{
		id: 20,
		User_id: 3445465,
		Category: 'SMM и маркетинг1',
		language: 'русский',
		id_telegram: -45456567,
		desc_channel: 'Отличный канал! Условия в ЛС!',
		link_Cannel: 'https://t.me/gdf5455gh',
		link_Type_Boolean: true,
		name_channel: 'Test: новости',
		url_Image_Channel: newImg,
		url_background_channel: newBackground,
		public_type: true,
		count_subscribers: 5257,
		count_views: 99912,
		ERR: 25,
		position: 2,

		priceObjects: [
			{
				price: 80000,
				time: 24,
				hot: false,
			},
			{
				price: 90000,
				time: 48,
				hot: false,
			},
			{
				price: 2000000,
				time: 72,
				hot: false,
			},
		],
		CPM: 100,
		// default_time_day: [24, 72, 2],
		// hot_price: 19990,
		hot_state: false,
	},
	{
		id: 21,
		User_id: 3445465,
		Category: 'SMM и маркетинг1',
		language: 'русский',
		id_telegram: -45456567,
		desc_channel: 'Отличный канал! Условия в ЛС!',
		link_Cannel: 'https://t.me/gdf5455gh',
		link_Type_Boolean: true,
		name_channel: 'Amex: новости',
		url_Image_Channel: img,
		url_background_channel: background,
		public_type: false,
		count_subscribers: 5257,
		count_views: 99912,
		ERR: 25,
		position: 2,

		priceObjects: [
			{
				price: 80000,
				time: 24,
				hot: false,
				for_hot: true,
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
