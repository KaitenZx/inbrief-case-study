// src/api/nytApi.ts

import axios from 'axios';
import { NewsArticle } from './types';

// Базовый URL и API ключ для New York Times
const NYT_API_BASE_URL = 'https://api.nytimes.com/svc/search/v2';
const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;  // Замените на ваш ключ API

// Получение новостей с учетом ключевых слов, категорий и дат
export const fetchNewsFromNYT = async (query: string, filterQuery: string, fromDate: string, toDate: string, page: number): Promise<NewsArticle[]> => {
	try {
		const response = await axios.get(`${NYT_API_BASE_URL}/articlesearch.json`, {
			params: {
				'api-key': NYT_API_KEY,
				'q': query || undefined,                    // Поиск по ключевым словам
				'fq': filterQuery || undefined,             // Фильтр по полям (например, `news_desk`)
				'begin_date': fromDate.replace(/-/g, '') || undefined,  // Дата начала в формате YYYYMMDD
				'end_date': toDate.replace(/-/g, '') || undefined,      // Дата конца в формате YYYYMMDD
				'page': page || 0,                          // Номер страницы
				'sort': 'relevance',                        // Сортировка по релевантности
			},
		});

		return response.data.response.docs.map((article: any) => ({
			source: 'The New York Times',
			author: article.byline?.original || 'Unknown',
			title: article.headline.main,
			description: article.snippet,
			url: article.web_url,
			urlToImage: article.multimedia?.[0]?.url ? `https://www.nytimes.com/${article.multimedia[0].url}` : '',
			publishedAt: article.pub_date,
			content: article.lead_paragraph,
		}));
	} catch (error) {
		console.error('Error fetching news from NYT API:', error);
		throw error;
	}
};
