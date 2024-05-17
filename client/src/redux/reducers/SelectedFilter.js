import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	filtered: {},
}

const selectedFilterSlice = createSlice({
	name: 'filtered',
	initialState,
	reducers: {
		setCatalog(state, action) {
			state.filtered = action.payload
		},
		deleteCatalog(state) {
			state.filtered = {}
		},
	},
})
export const { setCatalog, deleteCatalog } = selectedFilterSlice.actions

export default selectedFilterSlice.reducer
