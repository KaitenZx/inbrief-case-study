import { useState, useEffect, useRef } from 'react';
import styles from '../styles/CheckboxDropdown.module.scss';

interface CheckboxDropdownProps {
	label: string;
	options: string[];
	selectedOption: string;
	onChange: (selected: string) => void;
	disabled?: boolean;
}

const CheckboxDropdown = ({ label, options, selectedOption, onChange, disabled = false }: CheckboxDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selected, setSelected] = useState<string>(selectedOption);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const toggleDropdown = () => {
		if (!disabled) {
			setIsOpen((prev) => !prev);
		}
	};

	const handleOptionChange = (option: string) => {
		setSelected(option);
		onChange(option);
		setIsOpen(false);
	};

	const handleReset = () => {
		setSelected('');
		onChange('');
		setIsOpen(false);
	};

	const handleClickOutside = (event: MouseEvent) => {
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
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	useEffect(() => {
		setSelected(selectedOption);
	}, [selectedOption]);

	const buttonText = selected || label;

	return (
		<div className={styles.dropdown} ref={dropdownRef}>
			<button
				type="button"
				className={styles.dropdownButton}
				onClick={toggleDropdown}
				disabled={disabled}
			>
				{buttonText}
			</button>
			{selected && !disabled && (
				<button type="button" title="Clear" className={styles.resetButton} onClick={handleReset}>
					<span title="Clear">✕</span>
				</button>
			)}
			{isOpen && (
				<div className={styles.dropdownContent}>
					{options.map((option) => (
						<label key={option} className={styles.dropdownItem}>
							<input
								type="radio"
								checked={selected === option}
								onChange={() => handleOptionChange(option)}
								disabled={disabled}
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
