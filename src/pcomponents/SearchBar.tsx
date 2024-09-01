import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/SearchBar.module.scss';
import { setArticles, setLoading, setSearchQuery } from '../pstore/newsSlice';
import { fetchAggregatedNews } from '../api/aggregateNews';
import { RootState } from '../pstore/store';

const SearchBar = () => {
	const [query, setQuery] = useState('');
	const dispatch = useDispatch();
	const filters = useSelector((state: RootState) => state.news.filters);

	const handleSearch = async () => {
		if (!query.trim()) return;

		dispatch(setSearchQuery(query));
		dispatch(setLoading(true));

		try {
			const articles = await fetchAggregatedNews(
				query,
				filters.category,
				'',
				filters.startDate,
				filters.endDate,
				filters.source ? [filters.source] : [],
				1
			);
			dispatch(setArticles(articles));
		} catch (error) {
			console.error('Error fetching news:', error);
		} finally {
			dispatch(setLoading(false));
		}
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			handleSearch();
		}
	};

	const handleReset = () => {
		setQuery('');
		dispatch(setSearchQuery(''));
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
				{query && (
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