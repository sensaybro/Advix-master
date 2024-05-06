import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	pages: { label: 'Каталог', state: false },
}

const selectedCatalogSlice = createSlice({
	name: 'selectedCatalog',
	initialState,
	reducers: {
		setCatalog(state, action) {
			state.pages = action.payload
		},
		deleteCatalog(state) {
			state.pages = {}
		},
	},
})
export const { setCatalog, deleteCatalog } = selectedCatalogSlice.actions

export default selectedCatalogSlice.reducer
