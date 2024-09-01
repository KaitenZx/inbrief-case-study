// src/Store/newsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { NewsArticle, PersonalizationState, FiltersState, NewsState, SearchState } from '../utils/types';

const initialState: NewsState & SearchState = {
	articles: [],
	personalization: {
		author: '',
		source: '',
		category: '',
	},
	filters: {
		category: '',
		source: '',
		startDate: '',
		endDate: '',
	},
	query: '',
	isLoading: false,
};

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		setArticles(state, action: PayloadAction<NewsArticle[]>) {
			state.articles = action.payload;
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		setPersonalization(state, action: PayloadAction<PersonalizationState>) {
			state.personalization = action.payload;
		},
		setFilters(state, action: PayloadAction<FiltersState>) {
			state.filters = action.payload;
		},
		setSearchQuery(state, action: PayloadAction<string>) {
			state.query = action.payload;
		},

	},
});

export const { setArticles, setPersonalization, setFilters, setSearchQuery, setLoading } = newsSlice.actions;

export default newsSlice.reducer;
