import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchDataChannel = createAsyncThunk(
	'channel/ChannelFetch',
	async () => {
		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_API_KEY}/channel/all_published?is_published=true`
			)
			console.log('data', data)
			return data
		} catch (error) {
			console.log(error)
		}
	}
)
const initialState = {
	channels: [],
	status: 'loading', // loading | success | error
}

export const fetchDataChannelSlice = createSlice({
	name: 'channels',
	initialState,
	reducers: {
		setFetchDataChannel(state, action) {
			state.channels = action.payload
			state.status = 'success'
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchDataChannel.pending, (state, action) => {
				state.channels = []
				state.status = 'loading'
			})
			.addCase(fetchDataChannel.fulfilled, (state, action) => {
				// Добавление новых данных к существующему массиву

				state.channels = action.payload
				state.status = 'success'
			})
			.addCase(fetchDataChannel.rejected, (state, action) => {
				state.channels = []
				state.status = 'error'
			})
	},
})

// export const { setFetchDataChannel } = fetchDataChannelSlice.actions
