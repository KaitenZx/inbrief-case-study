// src/App.tsx

import React from 'react';
import Personalization from './Components/Personalization';
import SearchBar from './Components/SearchBar';
import Filters from './Components/Filters';
import NewsFeed from './Components/NewsFeed';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Personalization />

      {/* Поиск и фильтрация новостей */}
      <SearchBar />
      <Filters />

      {/* Лента новостей */}
      <NewsFeed />
    </div>
  );
};

export default App;
