// src/utils/categories.ts

// Константа с доступными категориями для каждого API
export const CATEGORIES = {
	newsapi: ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'],
	guardian: ['world', 'uk-news', 'us-news', 'politics', 'business', 'technology', 'environment', 'sports', 'culture'],
	nyt: ['Sports', 'Foreign', 'Business', 'Politics', 'Technology', 'Health'],
};

// Функция нормализации категорий: удаляет дубликаты и форматирует категории
export const normalizeCategories = (allCategories: string[]): string[] => {
	const uniqueCategories = new Set(allCategories.map(category => category.toLowerCase()));
	return Array.from(uniqueCategories).map(category => category.charAt(0).toUpperCase() + category.slice(1));
};
