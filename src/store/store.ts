import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice'
import filtersReducer from './filtersSlice'
import personalizationReducer from './personalizationSlice'
import { allNewsApi } from '../api/allNewsApi';

const store = configureStore({
	reducer: {
		news: newsReducer,
		filters: filtersReducer,
		personalization: personalizationReducer,
		[allNewsApi.reducerPath]: allNewsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(allNewsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
