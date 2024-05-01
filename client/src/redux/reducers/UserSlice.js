import createAsyncThunk from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchUser = createAsyncThunk('user/UserFetch', async token => {
	const { data } = await axios.get(`${SERVER_URL}/auth/user`, {
		params: {
			token,
		},
	})

	return data.result
})
const initialState = {
	user: {},
	status: 'loading', // loading | success | error
}

const FetchLessonSlice = createSlice({
	name: 'dataPage',
	initialState,
	reducers: {
		setPages(state, action) {
			state.dataPage = []
			state.status = 'success'
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.pending, (state, action) => {
				state.dataPage = {}
				state.status = 'loading'
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				// Добавление новых данных к существующему массиву
				state.dataPage = action.payload
				state.status = 'success'
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.dataPage = {}
				state.status = 'error'
			})
	},
})

export const { setPages } = FetchLessonSlice.actions

export default FetchLessonSlice.reducer
