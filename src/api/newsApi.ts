// src/api/newsApi.ts

import axios from 'axios';
import { NewsArticle } from './types';

// Базовый URL и API ключ для NewsAPI
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const NEWS_API_KEY = process.env.REACT_APP_NEWSAPI_KEY

// Получение новостей с учетом ключевых слов, источников и дат
export const fetchNewsFromNewsAPI = async (keywords: string, sources: string, fromDate: string, toDate: string, page: number): Promise<NewsArticle[]> => {
	try {
		const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
			params: {
				apiKey: NEWS_API_KEY,
				q: keywords || undefined,             // Поиск по ключевым словам
				sources: sources || undefined,        // Фильтр по источникам
				from: fromDate || undefined,          // Дата начала
				to: toDate || undefined,              // Дата конца
				page: page || 1,                      // Номер страницы
				pageSize: 10,                         // Количество статей на странице
				language: 'en',                       // Язык (например, английский)
			},
		});

		return response.data.articles.map((article: any) => ({
			source: article.source.name,
			author: article.author,
			title: article.title,
			description: article.description,
			url: article.url,
			urlToImage: article.urlToImage,
			publishedAt: article.publishedAt,
			content: article.content,
		}));
	} catch (error) {
		console.error('Error fetching news from NewsAPI:', error);
		throw error;
	}
};

// Получение топ-новостей с учетом категории и страны
export const fetchTopHeadlinesFromNewsAPI = async (category: string, country: string, page: number): Promise<NewsArticle[]> => {
	try {
		const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
			params: {
				apiKey: NEWS_API_KEY,
				category: category || undefined,     // Фильтр по категориям
				country: country || 'us',            // Фильтр по стране (по умолчанию США)
				page: page || 1,                     // Номер страницы
				pageSize: 10,                        // Количество статей на странице
				language: 'en',                      // Язык (например, английский)
			},
		});

		return response.data.articles.map((article: any) => ({
			source: article.source.name,
			author: article.author,
			title: article.title,
			description: article.description,
			url: article.url,
			urlToImage: article.urlToImage,
			publishedAt: article.publishedAt,
			content: article.content,
		}));
	} catch (error) {
		console.error('Error fetching top headlines from NewsAPI:', error);
		throw error;
	}
};
