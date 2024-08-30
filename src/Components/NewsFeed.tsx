// src/components/NewsFeed/NewsFeed.tsx

import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './NewsFeed.module.scss';
import { RootState } from '../Store/store';
import NewsItem from './NewsItem';
import Pagination from './Pagination';

const NewsFeed: React.FC = () => {
	const articles = useSelector((state: RootState) => state.news.articles); // Получаем уже отфильтрованные статьи из Redux
	const [currentPage, setCurrentPage] = useState(1); // Состояние для текущей страницы
	const articlesPerPage = 10; // Количество статей на странице

	// Расчет статей для отображения на текущей странице
	const currentArticles = useMemo(() => {
		const startIndex = (currentPage - 1) * articlesPerPage;
		const endIndex = startIndex + articlesPerPage;
		return articles.slice(startIndex, endIndex);
	}, [articles, currentPage]);

	// Обработка изменения страницы
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' }); // Скроллим вверх при изменении страницы
	};

	// Общее количество страниц
	const totalPages = Math.ceil(articles.length / articlesPerPage);

	return (
		<div className={styles.newsFeed}>
			{currentArticles.length > 0 ? (
				currentArticles.map((article, index) => (
					<NewsItem key={article.url || index} article={article} />
				))
			) : (
				<p>No articles found based on your filters and preferences.</p>
			)}

			{/* Отображаем пагинацию только если страниц больше одной */}
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
