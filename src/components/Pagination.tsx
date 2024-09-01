import styles from '../styles/Pagination.module.scss';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const MAX_VISIBLE_PAGES = 10;

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {


	const getPageNumbers = () => {
		let startPage = Math.max(currentPage - 5, 1);
		let endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

		if (endPage - startPage < MAX_VISIBLE_PAGES - 1) {
			startPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, 1);
		}

		const pages = [];
		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}
		return pages;
	};

	const pageNumbers = getPageNumbers();

	const handlePageChange = (page: number) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	return (
		<div className={styles.pagination}>
			<button
				className={styles.pageButton}
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				Previous
			</button>

			{pageNumbers.map((page) => (
				<button
					key={page}
					className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
					onClick={() => handlePageChange(page)}
				>
					{page}
				</button>
			))}

			<button
				className={styles.pageButton}
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				Next
			</button>
		</div>
	);
};

export default Pagination;
