import { configureStore } from '@reduxjs/toolkit'
import SelectedCatalogSlice from './reducers/SelectedCatalogSlice'
import ThemeSlice from './reducers/ThemeSlice'
export const store = configureStore({
	reducer: { selectedCatalog: SelectedCatalogSlice, theme: ThemeSlice },
})
