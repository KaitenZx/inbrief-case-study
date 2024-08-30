// src/api/aggregateNews.ts

import { fetchNewsFromNewsAPI } from './newsApi';
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
	page: number = 1
): Promise<NewsArticle[]> => {
	try {
		let allArticles: NewsArticle[] = [];

		if (sources.length === 0 || sources.includes('newsapi')) {
			const newsApiArticles = await fetchNewsFromNewsAPI(keywords || author, '', fromDate, toDate, page);
			allArticles = allArticles.concat(newsApiArticles);
		}

		if (sources.length === 0 || sources.includes('guardian')) {
			const guardianArticles = await fetchNewsFromGuardian(categories, author, fromDate, toDate, page);
			allArticles = allArticles.concat(guardianArticles);
		}

		if (sources.length === 0 || sources.includes('nyt')) {
			const nytArticles = await fetchNewsFromNYT(keywords, `byline:("${author}")`, fromDate, toDate, page);
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
