// src/api/guardianApi.ts

import axios from 'axios';
import { NewsArticle } from './types';

// Базовый URL и API ключ для The Guardian
const GUARDIAN_API_BASE_URL = 'https://content.guardianapis.com';
const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;  // Убедитесь, что ключ установлен в окружении

// Функция для получения новостей из The Guardian с учетом фильтров
export const fetchNewsFromGuardian = async (
	categories: string,
	keywords: string,   // Изменяем параметр на keywords для соответствия API
	fromDate: string,
	toDate: string,
	page: number
): Promise<NewsArticle[]> => {
	try {
		const response = await axios.get(`${GUARDIAN_API_BASE_URL}/search`, {
			params: {
				'api-key': GUARDIAN_API_KEY,
				'section': categories || undefined,   // Фильтр по секциям (категориям)
				'q': keywords || undefined,          // Фильтр по ключевым словам (включая авторов, если они упоминаются)
				'from-date': fromDate || undefined,  // Фильтр по дате начала
				'to-date': toDate || undefined,      // Фильтр по дате конца
				'page': page || 1,                   // Номер страницы для пагинации
				'page-size': 10,                     // Количество статей на странице
				'show-fields': 'headline,thumbnail,byline,trailText,body',  // Поля для включения в ответ
			},
		});

		// Обработка данных ответа API для соответствия интерфейсу NewsArticle
		return response.data.response.results.map((article: any) => ({
			source: 'The Guardian',
			author: article.fields?.byline || 'Unknown',    // Проверка наличия поля
			title: article.webTitle,
			description: article.fields?.trailText || '',   // Проверка наличия поля
			url: article.webUrl,
			urlToImage: article.fields?.thumbnail || '',    // Проверка наличия поля
			publishedAt: article.webPublicationDate,
			content: article.fields?.body || '',            // Проверка наличия поля
			category: article.sectionName,                  // Добавляем категорию, если нужна
		}));
	} catch (error) {
		console.error('Error fetching news from The Guardian:', error);
		throw error;
	}
};
