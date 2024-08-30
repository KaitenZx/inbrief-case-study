// src/components/Filters/Filters.tsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Filters.module.scss';
import { RootState } from '../Store/store';
import { setArticles, setFilters } from '../Store/newsSlice';
import CheckboxDropdown from './CheckboxDropdown';
import { CATEGORIES, normalizeCategories } from '../utils/categories';
import { fetchAggregatedNews } from '../api/aggregateNews'; // Функция для выполнения запросов к API

const Filters: React.FC = () => {
	const dispatch = useDispatch();
	const filters = useSelector((state: RootState) => state.news.filters);

	const [selectedCategory, setSelectedCategory] = useState(filters.category ? [filters.category] : []);
	const [selectedStartDate, setSelectedStartDate] = useState(filters.startDate || '');
	const [selectedEndDate, setSelectedEndDate] = useState(filters.endDate || '');
	const [selectedSource, setSelectedSource] = useState(filters.source ? [filters.source] : []);

	// Динамически изменяем доступные категории на основе выбранных источников
	const availableCategories = selectedSource.length > 0
		? normalizeCategories(selectedSource.flatMap((source) => CATEGORIES[source as keyof typeof CATEGORIES]))
		: normalizeCategories(Object.values(CATEGORIES).flat());

	// Проверка доступности выбранной категории
	useEffect(() => {
		if (selectedCategory[0] && !availableCategories.includes(selectedCategory[0])) {
			setSelectedCategory([]);
		}
	}, [selectedCategory, availableCategories]);

	useEffect(() => {
		// Обновляем фильтры в глобальном состоянии
		dispatch(setFilters({
			category: selectedCategory[0] || '',
			source: selectedSource[0] || '',
			startDate: selectedStartDate,
			endDate: selectedEndDate,
		}));

		// Запрос к API с учетом фильтров
		const fetchFilteredNews = async () => {
			try {
				const articles = await fetchAggregatedNews(
					'', // Ключевые слова не используются при фильтрации
					selectedCategory[0] || '',
					'', // Авторы не используются при фильтрации
					selectedStartDate,
					selectedEndDate,
					selectedSource, // Передаем массив источников
					1 // Номер страницы
				);
				dispatch(setArticles(articles));
			} catch (error) {
				console.error('Error fetching filtered news:', error);
			}
		};

		// Выполняем запрос только если выбран хотя бы один фильтр
		if (selectedCategory[0] || selectedSource[0] || selectedStartDate || selectedEndDate) {
			fetchFilteredNews();
		}
	}, [selectedCategory, selectedStartDate, selectedEndDate, selectedSource, dispatch]);

	return (
		<div className={styles.filters}>
			<CheckboxDropdown
				label="Category"
				options={availableCategories}
				selectedOptions={selectedCategory}
				onChange={setSelectedCategory}
				multiple={false}
			/>

			<CheckboxDropdown
				label="Source"
				options={['newsapi', 'guardian', 'nyt']}
				selectedOptions={selectedSource}
				onChange={setSelectedSource}
				multiple={false}
			/>

			<input
				type="date"
				name="startDate"
				value={selectedStartDate}
				onChange={(e) => setSelectedStartDate(e.target.value)}
				className={styles.dateInput}
				placeholder="Start Date"
			/>
			<input
				type="date"
				name="endDate"
				value={selectedEndDate}
				onChange={(e) => setSelectedEndDate(e.target.value)}
				className={styles.dateInput}
				placeholder="End Date"
			/>
		</div>
	);
};

export default Filters;
