// src/api/guardianApi.ts

import axios from 'axios';
import { NewsArticle } from './types';

// Базовый URL и API ключ для The Guardian
const GUARDIAN_API_BASE_URL = 'https://content.guardianapis.com';
const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;  // Замените на ваш ключ API

// Получение новостей с учетом категорий, ключевых слов и авторов
export const fetchNewsFromGuardian = async (categories: string, authors: string, fromDate: string, toDate: string, page: number): Promise<NewsArticle[]> => {
	try {
		const response = await axios.get(`${GUARDIAN_API_BASE_URL}/search`, {
			params: {
				'api-key': GUARDIAN_API_KEY,
				'section': categories || undefined,   // Фильтр по секциям (категориям)
				'q': authors || undefined,            // Фильтр по ключевым словам (авторам)
				'from-date': fromDate || undefined,   // Фильтр по дате
				'to-date': toDate || undefined,
				'page': page || 1,                    // Номер страницы для пагинации
				'page-size': 10,                      // Количество статей на странице
				'show-fields': 'headline,thumbnail,byline,trailText,body',  // Поля для включения в ответ
			},
		});

		return response.data.response.results.map((article: any) => ({
			source: 'The Guardian',
			author: article.fields.byline || 'Unknown',
			title: article.webTitle,
			description: article.fields.trailText,
			url: article.webUrl,
			urlToImage: article.fields.thumbnail,
			publishedAt: article.webPublicationDate,
			content: article.fields.body,
		}));
	} catch (error) {
		console.error('Error fetching news from The Guardian:', error);
		throw error;
	}
};
