// src/components/Personalization/Personalization.tsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPersonalization, setArticles } from '../Store/newsSlice';
import { fetchAggregatedNews } from '../api/aggregateNews';
import styles from './Personalization.module.scss';
import CheckboxDropdown from './CheckboxDropdown';
import { CATEGORIES, normalizeCategories } from '../utils/categories';


const Personalization: React.FC = () => {
	const dispatch = useDispatch();

	const [selectedSource, setSelectedSource] = useState<string[]>([]);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [authorInput, setAuthorInput] = useState<string>('');

	const availableCategories = selectedSource.length > 0
		? normalizeCategories(selectedSource.flatMap((source) => CATEGORIES[source as keyof typeof CATEGORIES]))
		: normalizeCategories(Object.values(CATEGORIES).flat());

	const handleApplyPreferences = async () => {
		// Сохраняем выбранные параметры в состояние персонализации Redux
		dispatch(setPersonalization({ source: selectedSource.join(','), category: selectedCategories.join(','), author: authorInput }));

		try {
			const articles = await fetchAggregatedNews(
				authorInput,               // Используем значение автора
				selectedCategories.join(','),
				authorInput,
				'', '',
				selectedSource,
				1
			);
			dispatch(setArticles(articles));  // Сохранение статей в Redux
		} catch (error) {
			console.error('Error fetching personalized news:', error);
		}
	};

	return (
		<div className={styles.personalization}>
			<h2>Personalize Your News Feed</h2>
			<div className={styles.filtersContainer}>
				<CheckboxDropdown
					label="Preferred Sources"
					options={['newsapi', 'guardian', 'nyt']}
					selectedOptions={selectedSource}
					onChange={setSelectedSource}
				/>

				<CheckboxDropdown
					label="Preferred Categories"
					options={availableCategories}
					selectedOptions={selectedCategories}
					onChange={setSelectedCategories}
				/>

				<input
					type="text"
					className={styles.input}
					value={authorInput}
					onChange={(e) => setAuthorInput(e.target.value)}
					placeholder="Preferred author"
				/>

				<button className={styles.applyButton} onClick={handleApplyPreferences}>
					Apply
				</button>
			</div>


		</div>
	);
};

export default Personalization;
