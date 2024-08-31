import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/SearchBar.module.scss';
import { setArticles, setSearchQuery } from '../Store/newsSlice';
import { fetchAggregatedNews } from '../api/aggregateNews';
import { RootState } from '../Store/store';

const SearchBar: React.FC = () => {
	const [query, setQuery] = useState('');
	const dispatch = useDispatch();
	const filters = useSelector((state: RootState) => state.news.filters);

	const handleSearch = async () => {
		if (!query.trim()) return; // Игнорируем пустой запрос

		dispatch(setSearchQuery(query)); // Сохраняем ключевые слова в глобальном состоянии

		try {
			const articles = await fetchAggregatedNews(
				query,                    // Используем ключевые слова для поиска
				filters.category,         // Категория из фильтров
				'',                       // Автор не используется
				filters.startDate,        // Начальная дата из фильтров
				filters.endDate,          // Конечная дата из фильтров
				filters.source ? [filters.source] : [], // Источники из фильтров
				1                         // Номер страницы
			);
			dispatch(setArticles(articles));
		} catch (error) {
			console.error('Error fetching news:', error);
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	const handleReset = () => {
		setQuery('');
		dispatch(setSearchQuery('')); // Очищаем ключевые слова в глобальном состоянии
	};

	return (
		<div className={styles.searchBar}>
			<div className={styles.inputContainer}>
				<input
					type="text"
					placeholder="Search for news..."
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					onKeyDown={handleKeyDown}
					className={styles.input}
				/>
				{query && ( // Отображаем кнопку Reset только если что-то введено
					<button type="button" title="Clear" className={styles.resetButton} onClick={handleReset}>
						<span title="Clear">✕</span>
					</button>
				)}
			</div>

			<button onClick={handleSearch} className={styles.button}>
				Search
			</button>
		</div>
	);
};

export default SearchBar;
