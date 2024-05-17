import { configureStore } from '@reduxjs/toolkit'
import SelectedCatalogSlice from './reducers/SelectedCatalogSlice'
import selectedFilterSlice from './reducers/SelectedFilter'
import ThemeSlice from './reducers/ThemeSlice'
import FetchUserSlice from './reducers/UserSlice'
export const store = configureStore({
	reducer: {
		selectedCatalog: SelectedCatalogSlice,
		theme: ThemeSlice,
		userData: FetchUserSlice,
		filterData: selectedFilterSlice,
	},
})
