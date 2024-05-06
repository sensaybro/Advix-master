import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	theme: true,
}

const ThemeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		themeReducer(state, action) {
			state.theme = action.payload
		},
		themeDeleteReducer(state) {
			state.pages = {}
		},
	},
})
export const { themeReducer, themeDeleteReducer } = ThemeSlice.actions

export default ThemeSlice.reducer
