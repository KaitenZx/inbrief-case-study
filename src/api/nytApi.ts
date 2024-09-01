import axios from 'axios';
import { NewsArticle } from '../utils/types';

const NYT_API_BASE_URL = 'https://api.nytimes.com/svc/search/v2';
const NYT_API_KEY = process.env.REACT_APP_NYT_API_KEY;

export const fetchNewsFromNYT = async (
	query: string,
	categories: string,
	fromDate: string,
	toDate: string,
	page: number
): Promise<NewsArticle[]> => {
	try {
		const response = await axios.get(`${NYT_API_BASE_URL}/articlesearch.json`, {
			params: {
				'api-key': NYT_API_KEY,
				'q': query || undefined,  // Поиск по ключевым словам
				'fq': categories ? `news_desk:("${categories}")` : undefined,
				'begin_date': fromDate ? fromDate.replace(/-/g, '') : undefined,
				'end_date': toDate ? toDate.replace(/-/g, '') : undefined,
				'page': page || 0,
				'sort': 'relevance',
			},
		});

		return response.data.response.docs.map((article: any) => ({
			source: 'The New York Times',
			author: article.byline?.original || 'Unknown',
			title: article.headline.main,
			description: article.snippet,
			url: article.web_url,
			urlToImage: article.multimedia?.find((media: any) => media.subtype === 'xlarge')?.url
				? `https://www.nytimes.com/${article.multimedia.find((media: any) => media.subtype === 'xlarge').url}`
				: '',
			publishedAt: article.pub_date,
			content: article.lead_paragraph,
		}));
	} catch (error) {
		console.error('Error fetching news from NYT API:', error);
		throw error;
	}
};
