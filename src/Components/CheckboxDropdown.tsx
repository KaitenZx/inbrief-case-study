// src/components/CheckboxDropdown/CheckboxDropdown.tsx

import React, { useState, useEffect } from 'react';
import styles from './CheckboxDropdown.module.scss';

interface CheckboxDropdownProps {
	label: string;
	options: string[];
	selectedOptions: string[];
	onChange: (selected: string[]) => void;
	multiple?: boolean;
}

const CheckboxDropdown: React.FC<CheckboxDropdownProps> = ({ label, options, selectedOptions, onChange, multiple = true }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<string[]>(selectedOptions);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleCheckboxChange = (option: string) => {
		let updatedSelected;
		if (multiple) {
			updatedSelected = selected.includes(option)
				? selected.filter((item) => item !== option)
				: [...selected, option];
		} else {
			updatedSelected = [option]; // В режиме одиночного выбора всегда одно значение
			setIsOpen(false); // Закрываем дропдаун при выборе
		}
		setSelected(updatedSelected);
		onChange(updatedSelected);
	};

	const handleReset = () => {
		setSelected([]);
		onChange([]);
		setIsOpen(false); // Закрываем дропдаун при сбросе
	};

	useEffect(() => {
		setSelected(selectedOptions); // Обновляем состояние, если selectedOptions изменяются извне
	}, [selectedOptions]);

	// Текст для отображения на кнопке дропдауна
	const buttonText = multiple
		? label
		: selected.length > 0
			? selected[0] // Отображаем выбранное значение
			: label;

	return (
		<div className={styles.dropdown}>
			<button type="button" className={styles.dropdownButton} onClick={toggleDropdown}>
				{buttonText} {/* Отображаем выбранное значение на кнопке */}
			</button>
			{isOpen && (
				<div className={styles.dropdownContent}>
					<button type="button" className={styles.resetButton} onClick={handleReset}>
						Reset
					</button>

					{options.map((option) => (
						<label key={option} className={styles.dropdownItem}>
							<input
								type={multiple ? "checkbox" : "radio"} // Используем checkbox для множества и radio для одного выбора
								checked={selected.includes(option)}
								onChange={() => handleCheckboxChange(option)}
							/>
							{option}
						</label>
					))}
				</div>
			)}
		</div>
	);
};

export default CheckboxDropdown;
