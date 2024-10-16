import { NewsArticle } from '../store/newsSlice';
import styles from '../styles/NewsItem.module.scss';

interface NewsItemProps {
	article: NewsArticle;
}

const NewsItem = ({ article }: NewsItemProps) => {
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
			{urlToImage && <img src={urlToImage} alt={title} className={styles.image} />}

			<div className={styles.content}>
				<h2 className={styles.title}>
					<a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
				</h2>

				{description && <p className={styles.description}>{description}</p>}

				{author && <p className={styles.author}>By: {author}</p>}
				<p className={styles.source}>{source} - {new Date(publishedAt).toLocaleDateString()}</p>

				{category && <span className={styles.category}>{category}</span>}
			</div>
		</div>
	);
};

export default NewsItem;
