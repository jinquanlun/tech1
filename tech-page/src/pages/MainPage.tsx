import React from 'react';
import HomePage from './HomePage';
import TechShowcasePage from './TechShowcasePage';
import InfiniteHero from '../components/ui/infinite-hero';
import '../styles/MainPage.css';

const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      {/* 首页部分 */}
      <section className="homepage-section">
        <HomePage />
      </section>

      {/* 技术展示页部分 */}
      <section className="tech-section">
        <TechShowcasePage />
      </section>

      {/* 最终页面 - 3D动画背景 */}
      <section className="infinite-hero-section">
        <InfiniteHero />
      </section>
    </div>
  );
};

export default MainPage;