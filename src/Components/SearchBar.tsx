// src/components/SearchBar.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './SearchBar.module.scss';
import { setArticles } from '../Store/newsSlice';
import { fetchAggregatedNews } from '../api/aggregateNews';

const SearchBar: React.FC = () => {
	const [query, setQuery] = useState('');
	const dispatch = useDispatch();

	const handleSearch = async () => {
		if (!query.trim()) return; // Игнорируем пустой запрос

		try {
			const articles = await fetchAggregatedNews(
				query,    // Используем ключевые слова для поиска
				'',       // Категории не используются
				'',       // Автор не используется
				'', '',   // Даты не используются
				[],       // Источники игнорируются, чтобы не учитывать персонализацию
				1         // Номер страницы
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

	return (
		<div className={styles.searchBar}>
			<input
				type="text"
				placeholder="Search for news..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onKeyDown={handleKeyDown}
				className={styles.input}
			/>
			<button onClick={handleSearch} className={styles.button}>
				Search
			</button>
		</div>
	);
};

export default SearchBar;
