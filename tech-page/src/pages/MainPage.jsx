import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import TechShowcasePage from './TechShowcasePage.jsx';
import InfiniteHero from '../components/ui/infinite-hero.jsx';
import '../styles/pages/MainPage.css';

const MainPage = () => {
  const location = useLocation();
  const techSectionRef = useRef(null);

  useEffect(() => {
    const state = location.state;
    if (state?.targetSection && techSectionRef.current) {
      // 滚动到技术页面部分
      techSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [location.state]);

  return (
    <div className="main-page">
      {/* 首页部分 */}
      <section className="homepage-section">
        <HomePage />
      </section>

      {/* 技术展示页部分 */}
      <section className="tech-section" ref={techSectionRef}>
        <TechShowcasePage />
      </section>

      {/* 最终页面 - 3D动画背景  */}
      <section 
        className="infinite-hero-section">
                <InfiniteHero />
      </section>
    </div>
  );
};

export default MainPage;