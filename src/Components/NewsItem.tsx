// src/components/NewsItem/NewsItem.tsx

import React from 'react';
import styles from '../styles/NewsItem.module.scss';
import { NewsArticle } from '../api/types';

interface NewsItemProps {
	article: NewsArticle;
}

const NewsItem: React.FC<NewsItemProps> = ({ article }) => {
	const {
		source,
		author,
		title,
		description,
		url,
		urlToImage,
		publishedAt,
		category,
	} = article;

	return (
		<div className={styles.newsItem}>
			{urlToImage && <img src={urlToImage} alt={title} className={styles.image} />} {/* Изображение статьи */}

			<div className={styles.content}>
				<h2 className={styles.title}>
					<a href={url} target="_blank" rel="noopener noreferrer">{title}</a> {/* Заголовок статьи */}
				</h2>

				{description && <p className={styles.description}>{description}</p>} {/* Описание статьи */}

				{author && <p className={styles.author}>By: {author}</p>} {/* Имя автора */}
				<p className={styles.source}>{source} - {new Date(publishedAt).toLocaleDateString()}</p> {/* Источник и дата */}

				{category && <span className={styles.category}>{category}</span>} {/* Категория статьи */}
			</div>
		</div>
	);
};

export default NewsItem;
