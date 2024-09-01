import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setPersonalization, setArticles, setLoading } from '../store/newsSlice';
import { fetchAggregatedNews } from '../api/aggregateNews';
import styles from '../styles/Personalization.module.scss';
import { CATEGORIES } from '../utils/categories';

const Personalization: React.FC = () => {
	const dispatch = useDispatch();
	const popupRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const [selectedSource, setSelectedSource] = useState<string[]>(JSON.parse(localStorage.getItem('selectedSource') || '[]'));
	const [selectedCategories, setSelectedCategories] = useState<string[]>(JSON.parse(localStorage.getItem('selectedCategories') || '[]'));
	const [authorInput, setAuthorInput] = useState(localStorage.getItem('authorInput') || '');

	const [tempSelectedSource, setTempSelectedSource] = useState<string[]>([...selectedSource]);
	const [tempSelectedCategories, setTempSelectedCategories] = useState<string[]>([...selectedCategories]);
	const [tempAuthorInput, setTempAuthorInput] = useState(authorInput);

	const availableCategories = CATEGORIES;

	const togglePopup = () => {

		if (!isOpen) {
			setTempSelectedSource([...selectedSource]);
			setTempSelectedCategories([...selectedCategories]);
			setTempAuthorInput(authorInput);
		}
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleApplyPreferences = async () => {

		localStorage.setItem('selectedSource', JSON.stringify(tempSelectedSource));
		localStorage.setItem('selectedCategories', JSON.stringify(tempSelectedCategories));
		localStorage.setItem('authorInput', tempAuthorInput);

		setSelectedSource(tempSelectedSource);
		setSelectedCategories(tempSelectedCategories);
		setAuthorInput(tempAuthorInput);

		dispatch(setPersonalization({ source: tempSelectedSource.join(','), category: tempSelectedCategories.join(','), author: tempAuthorInput }));
		dispatch(setLoading(true));
		setIsOpen(false);

		try {
			const articles = await fetchAggregatedNews(
				tempAuthorInput,
				tempSelectedCategories.join(','),
				tempAuthorInput,
				'', '',
				tempSelectedSource,
				1,
				true
			);
			dispatch(setArticles(articles));
		} catch (error) {
			console.error('Error fetching personalized news:', error);
		} finally {
			dispatch(setLoading(false));
		}
	};

	return (
		<>
			<button className={styles.burgerButton} onClick={togglePopup}>
				<div className={styles.bars}></div>
			</button>

			{isOpen && (
				<div className={styles.personalizationPopup} ref={popupRef}>
					<h2>Personalize Your News Feed</h2>
					<div className={styles.filtersContainer}>
						<div>
							<h3>Sources</h3>
							<div className={styles.checkboxGroup}>
								{['newsapi', 'guardian', 'NYT'].map((source) => (
									<label key={source}>
										<input
											type="checkbox"
											value={source}
											checked={tempSelectedSource.includes(source)}
											onChange={(e) =>
												setTempSelectedSource((prev) =>
													e.target.checked
														? [...prev, e.target.value]
														: prev.filter((item) => item !== e.target.value)
												)
											}
										/>
										{source}
									</label>
								))}
							</div>
						</div>

						<div>
							<h3>Categories</h3>
							<div className={styles.checkboxGroup}>
								{availableCategories.map((category) => (
									<label key={category}>
										<input
											type="checkbox"
											value={category}
											checked={tempSelectedCategories.includes(category)}
											onChange={(e) =>
												setTempSelectedCategories((prev) =>
													e.target.checked
														? [...prev, e.target.value]
														: prev.filter((item) => item !== e.target.value)
												)
											}
										/>
										{category}
									</label>
								))}
							</div>
						</div>
						<div>
							<h3>Author</h3>
							<input
								type="text"
								className={styles.input}
								value={tempAuthorInput}
								onChange={(e) => setTempAuthorInput(e.target.value)}
								placeholder="Type author name"
							/>
						</div>

						<button className={styles.applyButton} onClick={handleApplyPreferences}>
							Apply
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default Personalization;