import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'
export const fetchUserAuth = createAsyncThunk('user/UserFetch', async () => {
	const token = await Cookies.get('token')
	const { data } = await axios.get(
		`${process.env.REACT_APP_API_KEY}/auth/authorization`,
		{
			header: {
				token,
			},
		}
	)
	console.log(data.message.newUser)
	Cookies.set('token', data.message.token)
	return data.message.newUser
})
const initialState = {
	user: {},
	status: 'loading', // loading | success | error
}

const FetchUserAuthSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserAuth(state, action) {
			state.user = action.payload
			state.status = 'success'
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUserAuth.pending, (state, action) => {
				state.user = {}
				state.status = 'loading'
			})
			.addCase(fetchUserAuth.fulfilled, (state, action) => {
				// Добавление новых данных к существующему массиву

				state.user = action.payload
				state.status = 'success'
			})
			.addCase(fetchUserAuth.rejected, (state, action) => {
				state.user = {}
				state.status = 'error'
			})
	},
})

export const { setUserAuth } = FetchUserAuthSlice.actions

export default FetchUserAuthSlice.reducer
