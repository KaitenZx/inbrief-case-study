import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setArticles, setPersonalization } from './Store/newsSlice';
import Personalization from './Components/Personalization';
import SearchBar from './Components/SearchBar';
import Filters from './Components/Filters';
import NewsFeed from './Components/NewsFeed';
import { fetchAggregatedNews } from './api/aggregateNews';
import styles from './App.module.scss';

const App: React.FC = () => {
  const [filtersIsOpen, setFiltersIsOpen] = useState(false);
  const dispatch = useDispatch();

  // Логика загрузки персонализированной ленты при запуске
  useEffect(() => {
    const loadPersonalizedFeed = async () => {
      // Загрузка данных из локального хранилища
      const storedSource = JSON.parse(localStorage.getItem('selectedSource') || '[]');
      const storedCategories = JSON.parse(localStorage.getItem('selectedCategories') || '[]');
      const storedAuthor = localStorage.getItem('authorInput') || '';

      // Сохранение в Redux состояния персонализации
      dispatch(setPersonalization({
        source: storedSource.join(','),
        category: storedCategories.join(','),
        author: storedAuthor
      }));

      try {
        // Выполнение запроса для получения статей
        const articles = await fetchAggregatedNews(
          storedAuthor,                 // Автор или ключевые слова
          storedCategories.join(','),   // Категории
          storedAuthor,                 // Автор
          '', '',                       // Начальная и конечная дата не используются
          storedSource,                 // Источники
          1,                            // Номер страницы
          true                          // Индикатор персонализированного запроса
        );
        dispatch(setArticles(articles)); // Сохранение статей в Redux
      } catch (error) {
        console.error('Error fetching personalized news:', error);
      }
    };

    // Загрузка персонализированной ленты при запуске приложения
    loadPersonalizedFeed();
  }, [dispatch]);

  const showFilters = () => {
    setFiltersIsOpen(!filtersIsOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.search}>
          <Personalization />
          <SearchBar />
          <button className={styles.button} onClick={showFilters}>Filters</button>
        </div>
        {filtersIsOpen && <Filters />}
      </div>
      <NewsFeed />
    </div>
  );
};

export default App;
