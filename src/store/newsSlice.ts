// src/Store/newsSlice.ts

import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface NewsArticle {
	source: string;
	author?: string;
	title: string;
	description?: string;
	url: string;
	urlToImage?: string;
	publishedAt: string;
	content?: string;
	category?: string;
}

interface NewsState {
	articles?: NewsArticle[];
	query: string;
	isLoading: boolean;
}

interface SearchState {
	query: string;
}


const articlesAdapter = createEntityAdapter({
	selectId: (article: NewsArticle) => article.url,
	sortComparer: (a, b) => b.publishedAt.localeCompare(a.publishedAt),
})


const initialState = articlesAdapter.getInitialState<NewsState & SearchState>({
	query: '',
	isLoading: false,
});


const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		setArticles(state, action: PayloadAction<NewsArticle[]>) {
			articlesAdapter.setAll(state, action.payload)
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload;
		},
		setSearchQuery(state, action: PayloadAction<string>) {
			state.query = action.payload;
		},
	},
});


export const {
	selectAll: selectAllArticles,
} = articlesAdapter.getSelectors((state: RootState) => state.news);

export const { setArticles, setSearchQuery, setLoading } = newsSlice.actions;

export default newsSlice.reducer;
