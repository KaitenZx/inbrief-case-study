
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

export interface PersonalizationState {
	author: string;
	source: string;
	category: string;
}

export interface FiltersState {
	category: string;
	source: string;
	startDate: string;
	endDate: string;
}

export interface NewsState {
	articles: NewsArticle[];
	personalization: PersonalizationState;
	filters: FiltersState;
	query: string;
	isLoading: boolean;
}

export interface SearchState {
	query: string;
}
