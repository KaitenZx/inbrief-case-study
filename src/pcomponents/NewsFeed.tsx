import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/NewsFeed.module.scss';
import { RootState } from '../pstore/store';
import NewsItem from './NewsItem';
import Pagination from './Pagination';

const ARTICLES_PER_PAGE = 10;

const NewsFeed = () => {
	const articles = useSelector((state: RootState) => state.news.articles);
	const [currentPage, setCurrentPage] = useState(1);
	const isLoading = useSelector((state: RootState) => state.news.isLoading);


	const currentArticles = useMemo(() => {
		const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
		const endIndex = startIndex + ARTICLES_PER_PAGE;
		return articles.slice(startIndex, endIndex);
	}, [articles, currentPage]);


	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

	if (isLoading) {
		return <div className={styles.loader}></div>;
	}

	return (
		<div className={styles.newsFeed}>
			{currentArticles.length > 0 ? (
				currentArticles.map((article, index) => (
					<NewsItem key={article.url || index} article={article} />
				))
			) : (
				<p>No articles found based on your filters and preferences.</p>
			)}

			{totalPages > 1 && (
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	);
};

export default NewsFeed;
