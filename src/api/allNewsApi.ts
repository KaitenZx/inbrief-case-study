import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { NewsArticle } from '../store/newsSlice';

export const allNewsApi = createApi({
	reducerPath: 'newsApi',
	baseQuery: fetchBaseQuery({}),
	endpoints: (builder) => ({
		fetchAggregatedNews: builder.query<NewsArticle[], {
			keywords: string;
			categories: string;
			author: string;
			fromDate: string;
			toDate: string;
			sources: string[];
			page: number;
		}>({
			async queryFn(
				args,
				_queryApi,
				_extraOptions,
				baseQuery
			): Promise<{ data: NewsArticle[] } | { error: FetchBaseQueryError }> {
				try {
					const { keywords, categories, author, fromDate, toDate, sources, page } = args;
					const requests: Promise<NewsArticle[]>[] = [];

					if (sources.includes('newsapi') || sources.length === 0) {
						const response = await baseQuery({
							url: 'https://newsapi.org/v2/everything',
							params: {
								q: keywords || author,
								from: fromDate,
								to: toDate,
								page,
								pageSize: 20,
								apiKey: process.env.REACT_APP_NEWSAPI_KEY,
							},
						});

						if (response.error) return { error: response.error };
						requests.push(Promise.resolve((response.data as any).articles));
					}

					if (sources.includes('guardian') || sources.length === 0) {
						const response = await baseQuery({
							url: 'https://content.guardianapis.com/search',
							params: {
								section: categories,
								q: keywords,
								'from-date': fromDate,
								'to-date': toDate,
								page,
								'page-size': 20,
								'api-key': process.env.REACT_APP_GUARDIAN_API_KEY,
							},
						});

						if (response.error) return { error: response.error };
						requests.push(Promise.resolve((response.data as any).response.results));
					}

					if (sources.includes('NYT') || sources.length === 0) {
						const response = await baseQuery({
							url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json',
							params: {
								q: keywords,
								fq: categories ? `news_desk:("${categories}")` : undefined,
								'begin_date': fromDate.replace(/-/g, ''),
								'end_date': toDate.replace(/-/g, ''),
								page,
								'api-key': process.env.REACT_APP_NYT_API_KEY,
							},
						});

						if (response.error) return { error: response.error };
						requests.push(Promise.resolve((response.data as any).response.docs));
					}

					const results = await Promise.all(requests);
					const allArticles = results.flat();

					const uniqueArticles = Array.from(new Set(allArticles.map((a) => a.url)))
						.map((url) => allArticles.find((a) => a.url === url)!);

					return { data: uniqueArticles };
				} catch (error) {
					return { error: { status: 'CUSTOM_ERROR', data: error } as FetchBaseQueryError };
				}
			},
		}),
	}),
});

export const { useFetchAggregatedNewsQuery } = allNewsApi;
