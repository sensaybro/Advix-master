import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUser = createAsyncThunk('user/UserFetch', async secret => {
	const { data } = await axios.get(
		`https://advix-master.onrender.com/auth/user`,
		{
			params: {
				secret,
			},
		}
	)
	console.log(data.message.newUser)
	console.log(data.message.token)
	return data.message.newUser
})
const initialState = {
	user: {},
	status: 'loading', // loading | success | error
}

const FetchUserSlice = createSlice({
	name: 'user',
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

export const { setUser } = FetchUserSlice.actions

export default FetchUserSlice.reducer
