import { createSlice } from '@reduxjs/toolkit'
const initialState = {
	logined: false,
}

const clickedloginSlice = createSlice({
	name: 'logined',
	initialState,
	reducers: {
		setClickLogin(state, action) {
			state.logined= action.payload
		},
		setDeleteClickedLogin(state) {
			state.logined= false
		},
	},
})
export const {setClickLogin, setDeleteClickedLogin} =  clickedloginSlice.actions
export default clickedloginSlice.reducer
