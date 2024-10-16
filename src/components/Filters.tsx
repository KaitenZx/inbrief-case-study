import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Filters.module.scss';
import { RootState } from '../store/store';
import { setArticles, setLoading } from '../store/newsSlice';
import { CATEGORIES } from '../utils/categories';
import { fetchAggregatedNews } from '../api/aggregateNews';
import CheckboxDropdown from './CheckboxDropdown';
import { setFilters } from '../store/filtersSlice';

const Filters = () => {
	const dispatch = useDispatch();
	const filters = useSelector((state: RootState) => state.filters);
	const searchQuery = useSelector((state: RootState) => state.news.query);

	const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
	const [selectedStartDate, setSelectedStartDate] = useState(filters.startDate || '');
	const [selectedEndDate, setSelectedEndDate] = useState(filters.endDate || '');
	const [selectedSource, setSelectedSource] = useState(filters.source || '');

	const today = new Date().toISOString().split('T')[0];

	useEffect(() => {
		const fetchFilteredNews = async () => {

			dispatch(
				setFilters({
					category: selectedCategory,
					source: selectedSource,
					startDate: selectedStartDate,
					endDate: selectedEndDate,
				})
			);

			if (!searchQuery.trim()) return;

			dispatch(setLoading(true));

			try {
				const articles = await fetchAggregatedNews(
					searchQuery,
					selectedCategory,
					'',
					selectedStartDate,
					selectedEndDate,
					selectedSource ? [selectedSource] : [],
					1
				);
				dispatch(setArticles(articles));
			} catch (error) {
				console.error('Error fetching filtered news:', error);
			} finally {
				dispatch(setLoading(false));
			}
		};

		fetchFilteredNews();
	}, [selectedCategory, selectedStartDate, selectedEndDate, selectedSource, searchQuery, dispatch]);

	return (
		<div className={styles.filters}>
			<CheckboxDropdown
				label="Source"
				options={['newsapi', 'guardian', 'NYT']}
				selectedOption={selectedSource}
				onChange={setSelectedSource}
			/>

			<CheckboxDropdown
				label="Category"
				options={CATEGORIES}
				selectedOption={selectedCategory}
				onChange={setSelectedCategory}
				disabled={selectedSource === 'newsapi'}
			/>

			<input
				type="date"
				name="startDate"
				value={selectedStartDate}
				onChange={(e) => setSelectedStartDate(e.target.value)}
				className={`${styles.dateInput} ${selectedStartDate ? styles.dateSelected : ''}`}
				placeholder="Start Date"
				max={today}
			/>
			<input
				type="date"
				name="endDate"
				value={selectedEndDate}
				onChange={(e) => setSelectedEndDate(e.target.value)}
				className={`${styles.dateInput} ${selectedEndDate ? styles.dateSelected : ''}`}
				placeholder="End Date"
				max={today}
			/>
		</div>
	);
};

export default Filters;
