// src/Store/newsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsArticle, PersonalizationState, FiltersState, NewsState } from '../api/types'; // Импортируем интерфейсы

const initialState: NewsState = {
	articles: [],
	personalization: {
		author: '',
		source: '',
		category: '',
	},
	filters: {
		category: '',
		source: '',
		startDate: '', // Инициализируем поле startDate
		endDate: '',   // Инициализируем поле endDate
	},
};

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		setArticles(state, action: PayloadAction<NewsArticle[]>) {
			state.articles = action.payload;
		},
		setPersonalization(state, action: PayloadAction<PersonalizationState>) {
			state.personalization = action.payload;
		},
		setFilters(state, action: PayloadAction<FiltersState>) {
			state.filters = action.payload;
		},
	},
});

export const { setArticles, setPersonalization, setFilters } = newsSlice.actions;

export default newsSlice.reducer;
