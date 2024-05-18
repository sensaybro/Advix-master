import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchDataChannelOne = createAsyncThunk(
	'user/UserFetch',
	async id => {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_KEY}/channel/one?id=${id}`
		)
		console.log('data', data)
		return data
	}
)
const initialState = {
	channel: [],
	status: 'loading', // loading | success | error
}

const fetchDataChannelOneSlice = createSlice({
	name: 'channel',
	initialState,
	reducers: {
		setFetchDataChannelOne(state, action) {
			state.channel = action.payload
			state.status = 'success'
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchDataChannelOne.pending, (state, action) => {
				state.channel = []
				state.status = 'loading'
			})
			.addCase(fetchDataChannelOne.fulfilled, (state, action) => {
				// Добавление новых данных к существующему массиву

				state.channel = action.payload
				state.status = 'success'
			})
			.addCase(fetchDataChannelOne.rejected, (state, action) => {
				state.channel = []
				state.status = 'error'
			})
	},
})

export const { setFetchDataChannelOne } = fetchDataChannelOneSlice.actions

export default fetchDataChannelOneSlice.reducer
