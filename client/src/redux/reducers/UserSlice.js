import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'
export const fetchUser = createAsyncThunk('user/UserFetch', async secret => {
	try {
		const { data } = await axios.get(
			`${process.env.REACT_APP_API_KEY}/auth/user`,
			{
				params: {
					secret,
				},
			}
		)
		console.log(data.message.newUser)
		Cookies.set('token', data.message.token)
		return data.message.newUser
	} catch (error) {
		console.log(error)
	}
})
const initialState = {
	user: {},
	status: 'loading', // loading | success | error
}

export const FetchUserSlice = createSlice({
	name: 'user_fetch',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload
			state.status = 'success'
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.pending, (state, action) => {
				state.user = {}
				state.status = 'loading'
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				// Добавление новых данных к существующему массиву

				state.user = action.payload
				state.status = 'success'
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.user = {}
				state.status = 'error'
			})
	},
})
