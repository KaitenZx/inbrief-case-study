// src/api/aggregateNews.ts

import { fetchNewsFromNewsAPI, fetchTopHeadlinesFromNewsAPI } from './newsApi';
import { fetchNewsFromGuardian } from './guardianApi';
import { fetchNewsFromNYT } from './nytApi';
import { NewsArticle } from './types';

// Агрегация новостей из всех источников
export const fetchAggregatedNews = async (
	keywords: string,
	categories: string,
	author: string,
	fromDate: string,
	toDate: string,
	sources: string[],
	page: number = 1,
	useCategoriesEndpoint = false  // Новый параметр для определения какого эндпоинта использовать
): Promise<NewsArticle[]> => {
	try {
		let allArticles: NewsArticle[] = [];

		if (sources.length === 0 || sources.includes('newsapi')) {
			// Используем разные эндпоинты NewsAPI в зависимости от флага
			if (useCategoriesEndpoint) {
				const newsApiArticles = await fetchTopHeadlinesFromNewsAPI(categories, page);
				allArticles = allArticles.concat(newsApiArticles);
			} else {
				const newsApiArticles = await fetchNewsFromNewsAPI(keywords || author, fromDate, toDate, page);
				allArticles = allArticles.concat(newsApiArticles);
			}
		}

		if (sources.length === 0 || sources.includes('guardian')) {
			const guardianArticles = await fetchNewsFromGuardian(categories, keywords, fromDate, toDate, page);
			allArticles = allArticles.concat(guardianArticles);
		}

		if (sources.length === 0 || sources.includes('nyt')) {
			const nytArticles = await fetchNewsFromNYT(keywords, categories, fromDate, toDate, page);
			allArticles = allArticles.concat(nytArticles);
		}

		// Убираем дублированные новости (по URL)
		const uniqueArticles = Array.from(new Set(allArticles.map((a) => a.url))).map((url) => {
			return allArticles.find((a) => a.url === url)!;
		});

		return uniqueArticles;
	} catch (error) {
		console.error('Error fetching aggregated news:', error);
		throw error;
	}
};
