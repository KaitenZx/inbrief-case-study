import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Filters.module.scss';
import { RootState } from '../Store/store';
import { setArticles, setFilters } from '../Store/newsSlice';
import CheckboxDropdown from './CheckboxDropdown';
import { CATEGORIES } from '../utils/categories'; // Используем общий список категорий
import { fetchAggregatedNews } from '../api/aggregateNews';

const Filters: React.FC = () => {
	const dispatch = useDispatch();
	const filters = useSelector((state: RootState) => state.news.filters);
	const searchQuery = useSelector((state: RootState) => state.news.query); // Получаем поисковые ключевые слова из состояния

	const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
	const [selectedStartDate, setSelectedStartDate] = useState(filters.startDate || '');
	const [selectedEndDate, setSelectedEndDate] = useState(filters.endDate || '');
	const [selectedSource, setSelectedSource] = useState(filters.source || '');

	// Получаем сегодняшнюю дату в формате YYYY-MM-DD
	const today = new Date().toISOString().split('T')[0];

	// Обновляем фильтры при изменении состояния
	useEffect(() => {
		dispatch(setFilters({
			category: selectedCategory,
			source: selectedSource,
			startDate: selectedStartDate,
			endDate: selectedEndDate,
		}));

		const fetchFilteredNews = async () => {
			if (!searchQuery.trim()) return; // Выполняем запрос только если есть что-то в строке поиска

			try {
				const articles = await fetchAggregatedNews(
					searchQuery,             // Используем ключевые слова из состояния
					selectedCategory,        // Категория
					'',                      // Авторы не используются
					selectedStartDate,       // Начальная дата
					selectedEndDate,         // Конечная дата
					selectedSource ? [selectedSource] : [], // Источники
					1                        // Номер страницы
				);
				dispatch(setArticles(articles));
			} catch (error) {
				console.error('Error fetching filtered news:', error);
			}
		};

		// Проверяем наличие строки поиска и хотя бы одного фильтра
		if ((selectedCategory || selectedSource || selectedStartDate || selectedEndDate) && searchQuery.trim()) {
			fetchFilteredNews();
		}
	}, [selectedCategory, selectedStartDate, selectedEndDate, selectedSource, searchQuery, dispatch]);

	return (
		<div className={styles.filters}>
			<CheckboxDropdown
				label="Source"
				options={['newsapi', 'guardian', 'nyt']}
				selectedOption={selectedSource}
				onChange={setSelectedSource}
			/>

			<CheckboxDropdown
				label="Category"
				options={CATEGORIES}
				selectedOption={selectedCategory}
				onChange={setSelectedCategory}
			/>

			<input
				type="date"
				name="startDate"
				value={selectedStartDate}
				onChange={(e) => setSelectedStartDate(e.target.value)}
				className={styles.dateInput}
				placeholder="Start Date"
				max={today}  // Ограничиваем выбор сегодняшним днем
			/>
			<input
				type="date"
				name="endDate"
				value={selectedEndDate}
				onChange={(e) => setSelectedEndDate(e.target.value)}
				className={styles.dateInput}
				placeholder="End Date"
				max={today}  // Ограничиваем выбор сегодняшним днем
			/>
		</div>
	);
};

export default Filters;
