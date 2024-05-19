import { configureStore } from '@reduxjs/toolkit'
import ChangedPageSlice from './reducers/ChangedPageSlice'

import { fetchDataChannelSlice } from './reducers/ChannelDataSlice'
import fetchDataChannelOneSlice from './reducers/ChannelOneDataSlice.js'
import SelectedCatalogSlice from './reducers/SelectedCatalogSlice'
import selectedFilterSlice from './reducers/SelectedFilter'
import ThemeSlice from './reducers/ThemeSlice'
import { FetchUserSlice } from './reducers/UserSlice'

export const store = configureStore({
	reducer: {
		selectedCatalog: SelectedCatalogSlice,
		theme: ThemeSlice,
		userData: FetchUserSlice.reducer,
		filterData: selectedFilterSlice,
		channelData: fetchDataChannelSlice.reducer,
		channelOneData: fetchDataChannelOneSlice,
		changePageData: ChangedPageSlice,
	},
})
