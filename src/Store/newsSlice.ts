// src/Store/newsSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsArticle, PersonalizationState, FiltersState, NewsState } from '../api/types'; // Импортируем интерфейсы

interface SearchState {
	query: string;
}

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
	query: '', // Новое поле для хранения поисковых ключевых слов
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
		setSearchQuery(state, action: PayloadAction<string>) {
			state.query = action.payload; // Обновляем поисковые ключевые слова
		},
	},
});

export const { setArticles, setPersonalization, setFilters, setSearchQuery } = newsSlice.actions;

export default newsSlice.reducer;
