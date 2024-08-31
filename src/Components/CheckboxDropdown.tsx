import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/CheckboxDropdown.module.scss';

interface CheckboxDropdownProps {
	label: string;
	options: string[];
	selectedOption: string;  // Изменили на одну выбранную опцию
	onChange: (selected: string) => void;  // Изменили тип на одну строку
}

const CheckboxDropdown: React.FC<CheckboxDropdownProps> = ({ label, options, selectedOption, onChange }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<string>(selectedOption);
	const dropdownRef = useRef<HTMLDivElement | null>(null); // Реф для отслеживания кликов вне дропдауна

	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	const handleOptionChange = (option: string) => {
		setSelected(option);
		onChange(option);
		setIsOpen(false); // Закрываем дропдаун при выборе
	};

	const handleReset = () => {
		setSelected(''); // Сбрасываем выбор
		onChange('');
		setIsOpen(false); // Закрываем дропдаун при сбросе
	};

	const handleClickOutside = (event: MouseEvent) => {
		// Если клик был вне области дропдауна, закрываем его
		if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		// Удаляем слушатель при размонтировании компонента
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	useEffect(() => {
		setSelected(selectedOption); // Обновляем состояние, если selectedOption изменяется извне
	}, [selectedOption]);

	// Текст для отображения на кнопке дропдауна
	const buttonText = selected || label;

	return (
		<div className={styles.dropdown} ref={dropdownRef}>
			<button type="button" className={styles.dropdownButton} onClick={toggleDropdown}>
				{buttonText} {/* Отображаем выбранное значение на кнопке */}
			</button>
			{selected && ( // Отображаем кнопку Reset только если что-то выбрано
				<button type="button" title="Clear" className={styles.resetButton} onClick={handleReset}>
					<span title="Clear">✕</span>
				</button>
			)}
			{isOpen && (
				<div className={styles.dropdownContent}>
					{options.map((option) => (
						<label key={option} className={styles.dropdownItem}>
							<input
								type="radio"  // Используем только радиокнопки
								checked={selected === option}
								onChange={() => handleOptionChange(option)}
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
