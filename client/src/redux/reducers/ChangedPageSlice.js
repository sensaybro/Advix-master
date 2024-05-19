import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	count: 0,
}

const ChangedPageSlice = createSlice({
	name: 'count',
	initialState,
	reducers: {
		setPage(state, action) {
			state.count = action.payload
		},
		deletePage(state) {
			state.count = 0
		},
	},
})
export const { setPage, deletePage } = ChangedPageSlice.actions

export default ChangedPageSlice.reducer
