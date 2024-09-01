import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setArticles, setLoading, setPersonalization } from './store/newsSlice';
import Personalization from './components/Personalization';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import NewsFeed from './components/NewsFeed';
import { fetchAggregatedNews } from './api/aggregateNews';
import styles from './App.module.scss';

const App: React.FC = () => {
  const [filtersIsOpen, setFiltersIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadPersonalizedFeed = async () => {

      const storedSource = JSON.parse(localStorage.getItem('selectedSource') || '[]');
      const storedCategories = JSON.parse(localStorage.getItem('selectedCategories') || '[]');
      const storedAuthor = localStorage.getItem('authorInput') || '';

      dispatch(setPersonalization({
        source: storedSource.join(','),
        category: storedCategories.join(','),
        author: storedAuthor
      }));
      dispatch(setLoading(true));

      try {
        const articles = await fetchAggregatedNews(
          storedAuthor,
          storedCategories.join(','),
          storedAuthor,
          '', '',
          storedSource,
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
          <div className={styles.title}>IN BRIEF</div>

        </div>
        {filtersIsOpen && <Filters />}
      </div>
      <NewsFeed />
    </div>
  );
};

export default App;
