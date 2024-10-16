import axios from 'axios';
import { NewsArticle } from '../store/newsSlice';

const GUARDIAN_API_BASE_URL = 'https://content.guardianapis.com';
const GUARDIAN_API_KEY = process.env.REACT_APP_GUARDIAN_API_KEY;

export const fetchNewsFromGuardian = async (
	categories: string,
	keywords: string,
	fromDate: string,
	toDate: string,
	page: number
): Promise<NewsArticle[]> => {
	try {
		const response = await axios.get(`${GUARDIAN_API_BASE_URL}/search`, {
			params: {
				'api-key': GUARDIAN_API_KEY,
				'section': categories || undefined,
				'q': keywords || undefined,
				'from-date': fromDate || undefined,
				'to-date': toDate || undefined,
				'page': page || 1,
				'page-size': 20,
				'show-fields': 'headline,thumbnail,byline,trailText,body',
			},
		});

		return response.data.response.results.map((article: any) => ({
			source: 'The Guardian',
			author: article.fields?.byline || 'Unknown',
			title: article.webTitle,
			description: article.fields?.trailText || '',
			url: article.webUrl,
			urlToImage: article.fields?.thumbnail || '',
			publishedAt: article.webPublicationDate,
			content: article.fields?.body || '',
			category: article.sectionName,
		}));
	} catch (error) {
		console.error('Error fetching news from The Guardian:', error);
		throw error;
	}
};
