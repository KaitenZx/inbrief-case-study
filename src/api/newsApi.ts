'newsApi.ts'
import axios from 'axios';
import { NewsArticle } from '../store/newsSlice';

const NEWS_API_BASE_URL = 'https://newsapi.org/v2';
const NEWS_API_KEY = process.env.REACT_APP_NEWSAPI_KEY;

export const fetchNewsFromNewsAPI = async (
	keywords: string,
	fromDate: string,
	toDate: string,
	page: number
): Promise<NewsArticle[]> => {
	try {
		const response = await axios.get(`${NEWS_API_BASE_URL}/everything`, {
			params: {
				apiKey: NEWS_API_KEY,
				q: keywords || undefined,
				from: fromDate || undefined,
				to: toDate || undefined,
				page: page || 1,
				pageSize: 20,
				language: 'en',
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

export const fetchTopHeadlinesFromNewsAPI = async (
	category: string,
	page: number
): Promise<NewsArticle[]> => {
	try {
		const response = await axios.get(`${NEWS_API_BASE_URL}/top-headlines`, {
			params: {
				apiKey: NEWS_API_KEY,
				category: category || undefined,
				page: page || 1,
				pageSize: 20,
				language: 'en',
				country: 'us',
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
