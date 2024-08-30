
// src/api/types.ts


export interface NewsArticle {
	source: string;           // Источник статьи (например, "The Guardian")
	author?: string;          // Имя автора статьи
	title: string;            // Заголовок статьи
	description?: string;     // Краткое описание статьи
	url: string;              // Ссылка на полную статью
	urlToImage?: string;      // URL изображения
	publishedAt: string;      // Дата и время публикации статьи
	content?: string;         // Основное содержание статьи (если доступно)
	category?: string;        // Категория статьи
}

export interface PersonalizationState {
	author: string;
	source: string;
	category: string;
}

export interface FiltersState {
	category: string;
	source: string;
	startDate: string; // Начало диапазона дат
	endDate: string;   // Конец диапазона дат
}

export interface NewsState {
	articles: NewsArticle[];
	personalization: PersonalizationState;
	filters: FiltersState;
}
