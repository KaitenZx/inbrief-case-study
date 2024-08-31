import axios from 'axios';
import { NewsArticle } from './types';

// Базовый URL и API ключ для New York Times
const NYT_API_BASE_URL = 'https://api.nytimes.com/svc/search/v2';
const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;  // Замените на ваш ключ API

// Получение новостей с учетом ключевых слов, категорий и дат
export const fetchNewsFromNYT = async (
	query: string,
	categories: string,  // Используем 'news_desk' для фильтрации по категориям
	fromDate: string,
	toDate: string,
	page: number
): Promise<NewsArticle[]> => {
	try {
		// Форматирование параметров запроса к NYT API
		const response = await axios.get(`${NYT_API_BASE_URL}/articlesearch.json`, {
			params: {
				'api-key': NYT_API_KEY,
				'q': query || undefined,  // Поиск по ключевым словам
				'fq': categories ? `news_desk:("${categories}")` : undefined,  // Используем фильтр для категорий
				'begin_date': fromDate ? fromDate.replace(/-/g, '') : undefined,  // Дата начала в формате YYYYMMDD
				'end_date': toDate ? toDate.replace(/-/g, '') : undefined,        // Дата конца в формате YYYYMMDD
				'page': page || 0,                          // Номер страницы
				'sort': 'relevance',                        // Сортировка по релевантности
			},
		});

		// Маппинг ответа на объект NewsArticle
		return response.data.response.docs.map((article: any) => ({
			source: 'The New York Times',
			author: article.byline?.original || 'Unknown',
			title: article.headline.main,
			description: article.snippet,
			url: article.web_url,
			urlToImage: article.multimedia?.find((media: any) => media.subtype === 'xlarge')?.url
				? `https://www.nytimes.com/${article.multimedia.find((media: any) => media.subtype === 'xlarge').url}`
				: '', // Проверяем доступность изображения
			publishedAt: article.pub_date,
			content: article.lead_paragraph,
		}));
	} catch (error) {
		console.error('Error fetching news from NYT API:', error);
		throw error;
	}
};
