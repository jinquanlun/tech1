import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { hphCategories, pefCategories } from '../config/techCategories.js';
import '../styles/pages/TechShowcasePage.css';

const TechShowcasePage = ({ homeAnimationComplete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [focusedSection, setFocusedSection] = useState('pef'); // 默认聚焦PEF
  const [scrolling, setScrolling] = useState(false);
  const [internalStep, setInternalStep] = useState(0); // 0: PEF显示, 1: HPH显示, 2: 可以继续向下滚动

  // 分别管理两个区域的状态
  const [hphSelectedCategory, setHphSelectedCategory] = useState(null);
  const [hphShowCategory, setHphShowCategory] = useState(false);
  const [pefSelectedCategory, setPefSelectedCategory] = useState(null);
  const [pefShowCategory, setPefShowCategory] = useState(false);

  // 品类动画状态
  const [categoryAnimating, setCategoryAnimating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // 用于重新触发动画

  // 视频播放状态
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState('');
  const [currentVideoTitle, setCurrentVideoTitle] = useState('');

  const animTime = 2000; // 调慢动画速度
  const canvasRef = useRef(null);

  // 处理从详情页返回时的导航状态
  useEffect(() => {
    const state = location.state;
    if (state?.targetSection) {
      setFocusedSection(state.targetSection);
      // 延迟清除状态，确保组件已经更新
      setTimeout(() => {
        navigate(location.pathname, { replace: true });
      }, 100);
    }
  }, [location.state, navigate, location.pathname]);

  // 粒子动画相关
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let particles = [];
    let onMobile = window.innerWidth < 768;

    // 设置canvas尺寸
    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      // 先不缩放，避免渲染问题
    };

    resizeCanvas();

    // 变量 - 平衡视觉效果和性能
    let particleNum = onMobile ? Math.floor(window.innerWidth / 120) : Math.floor(window.innerWidth / 60);
    if (particleNum < (onMobile ? 12 : 25)) particleNum = onMobile ? 12 : 25;

    let minDist = window.innerWidth / 6; // 调整连接距离
    if (minDist < 180) minDist = 180;
    else if (minDist > 250) minDist = 250;

    // 移除未使用的鼠标事件变量

    // 粒子类
    class Particle {
      constructor(index) {
        // 按照原始代码的分布方式
        this.x = index * (window.innerWidth / particleNum);
        this.y = Math.random() * window.innerHeight;
        this.vy = (Math.random() * -1) / 3;
        this.radius = 1.5; // 固定半径，如原始代码
      }

      draw() {
        if (!ctx) return;
        // 增强粒子可见度
        ctx.fillStyle = "rgba(255,255,255,0.95)"; // 更明亮的粒子
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();

        // 添加一个更小的亮核心
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(Math.round(this.x), Math.round(this.y), this.radius * 0.6, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
      }
    }

    // 初始化粒子
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleNum; i++) {
        particles.push(new Particle(i));
      }
    };

    initParticles();

    // 绘制背景颜色
    const paintCanvas = () => {
      if (!ctx) return;
      // 根据当前页面设置适当的背景色
      const bgColor = focusedSection === 'hph' ? "rgba(10, 10, 10, 0.3)" : "rgba(26, 29, 36, 0.3)";
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };

    // 粒子间距离连线
    const distance = (p1, p2) => {
      if (!ctx) return;
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= minDist) {
        ctx.beginPath();
        // 增强连线可见度
        const distRatio = 1 - dist / minDist;
        const opacity = 0.8 * distRatio; // 提高基础透明度
        const lineWidth = Math.max(0.8, 1.5 * distRatio); // 动态线宽
        ctx.strokeStyle = `rgba(255,255,255,${opacity})`;
        ctx.lineWidth = lineWidth;
        ctx.moveTo(Math.round(p1.x), Math.round(p1.y));
        ctx.lineTo(Math.round(p2.x), Math.round(p2.y));
        ctx.stroke();
        ctx.closePath();
      }
    };

    // 更新粒子位置 - 性能优化
    const update = () => {
      const amplitude = onMobile ? window.innerWidth / 25 : window.innerWidth / 18; // 减少振幅计算
      let theta = Date.now() * 0.0008; // 稍微减慢动画速度
      const dx = (Math.PI * 2) / particleNum;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!onMobile) {
          // 桌面端多层次运动，覆盖整个屏幕高度
          const waveOffset = i * dx;
          const speedVariation = 1 + (i % 3) * 0.2; // 减少速度变化，提升性能

          if (i % 3 === 0) {
            // 上半部分运动
            p.y = window.innerHeight * 0.3 + Math.sin(theta * speedVariation + waveOffset) * amplitude;
          } else if (i % 3 === 1) {
            // 中间部分运动
            p.y = window.innerHeight * 0.5 + Math.cos(theta * speedVariation + waveOffset) * amplitude * 0.8;
          } else {
            // 下半部分运动
            p.y = window.innerHeight * 0.7 + Math.sin(theta * speedVariation + waveOffset + Math.PI/3) * amplitude * 0.6;
          }
        } else {
          // 移动端简单运动
          p.y += p.vy;
          if (p.y > window.innerHeight || p.y < 0) {
            p.vy = -p.vy;
          }
        }

        // 边界检查
        if (p.x + p.radius > window.innerWidth) p.x = p.radius;
        else if (p.x - p.radius < 0) p.x = window.innerWidth - p.radius;

        if (p.y + p.radius > window.innerHeight) p.y = p.radius;
        else if (p.y - p.radius < 0) p.y = window.innerHeight - p.radius;

        // 检查与其他粒子的距离
        for (let j = i + 1; j < particles.length; j++) {
          distance(p, particles[j]);
        }
      }
    };

    // 主绘制循环
    const draw = () => {
      paintCanvas();
      particles.forEach(p => p.draw());
      update();
      animationId = requestAnimationFrame(draw);
    };

    // 移除鼠标事件处理，简化性能

    const handleResize = () => {
      onMobile = window.innerWidth < 768;
      resizeCanvas();
      particleNum = onMobile ? Math.floor(window.innerWidth / 120) : Math.floor(window.innerWidth / 60);
      if (particleNum < (onMobile ? 12 : 25)) particleNum = onMobile ? 12 : 25;
      minDist = window.innerWidth / 6;
      if (minDist < 180) minDist = 180;
      else if (minDist > 250) minDist = 250;
      initParticles();
    };

    // 添加事件监听
    window.addEventListener('resize', handleResize);

    // 开始动画
    draw();

    // 清理函数
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [focusedSection]);


  const handleCategoryClick = (category, section) => {
    // 设置动画状态，禁用滚动
    setCategoryAnimating(true);

    // 增加动画key来强制重新渲染和触发动画
    setAnimationKey(prev => prev + 1);

    if (section === 'hph') {
      setHphSelectedCategory(category);
      setHphShowCategory(true);
    } else {
      setPefSelectedCategory(category);
      setPefShowCategory(true);
    }

    // 动画持续时间后恢复滚动（根据CSS动画时间）
    setTimeout(() => {
      setCategoryAnimating(false);
    }, 1000); // 匹配CSS动画时间 0.8s
  };

  const handleMainPageClick = () => {
    // 返回主页时清除所有分类详情
    setHphShowCategory(false);
    setHphSelectedCategory(null);
    setPefShowCategory(false);
    setPefSelectedCategory(null);
    // 重置动画状态
    setCategoryAnimating(false);
  };


  useEffect(() => {
    const handleWheel = (e) => {
      // 如果正在显示分类详情或正在动画中，禁用滚动切换
      if (scrolling || hphShowCategory || pefShowCategory || categoryAnimating) return;

      // 如果第一页动画还没完成，不处理
      if (!homeAnimationComplete) return;

      // 检查是否在TechShowcasePage区域内滚动
      const techSection = document.querySelector('.tech-section');
      if (!techSection) return;

      const rect = techSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 检查第二页是否完全占满屏幕（或接近占满）
      const isInTechSection = rect.top <= 100 && rect.bottom >= windowHeight - 50;

      if (isInTechSection) {
        if (e.deltaY > 0) { // 向下滚动
          if (internalStep === 0) {
            // 从PEF切换到HPH
            e.preventDefault();
            e.stopPropagation();
            setInternalStep(1);
            setFocusedSection('hph');
            setScrolling(true);
            setTimeout(() => setScrolling(false), animTime);
            return;
          }
          // internalStep === 1 时允许正常滚动到下一页
        } else { // 向上滚动
          if (internalStep === 1) {
            // 从HPH切换回PEF
            e.preventDefault();
            e.stopPropagation();
            setInternalStep(0);
            setFocusedSection('pef');
            setScrolling(true);
            setTimeout(() => setScrolling(false), animTime);
            return;
          }
          // internalStep === 0 时允许正常滚动到上一页
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [homeAnimationComplete, internalStep, scrolling, hphShowCategory, pefShowCategory, categoryAnimating, animTime]);

  return (
    <div className="skw-pages">
      {/* Canvas粒子动画背景 */}
      <canvas
        ref={canvasRef}
        className="particle-canvas"
      />
      {/* HPH Section - 第一页 */}
      <div className={`skw-page skw-page-1 ${focusedSection === 'hph' ? 'active' : ''}`}>
        {!hphShowCategory ? (
          // HPH 主页面
          <>
            <div className="skw-page__half skw-page__half--left">
              <div className="skw-page__skewed">
                <div className="skw-page__content">
                  <h2 className="skw-page__heading">
                    <div className="title-line-1">HPH</div>
                    <div className="title-line-2">纳米破碎·动态灭菌</div>
                  </h2>
                  <button className="tech-button" onClick={() => {
                    setCurrentVideoUrl('/videos/hph-demo.mp4');
                    setCurrentVideoTitle('HPH 纳米破碎·动态灭菌技术演示');
                    setIsVideoOpen(true);
                  }}>
                    <span className="vline"></span>
                    <span className="text">视 频 演 示</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="skw-page__half skw-page__half--right">
              <div className="skw-page__skewed">
                <div className="skw-page__content">
                <p className="skw-page__description">
                  超高压纳米破碎技术利用300-400MPa超高压质阀
                    <br />
                    通过空化、剪切与撞击实现纳米级破碎与灭菌。
                  </p>
                  <p className="skw-page__description">
                  可广泛应用于果汁、化妆品、制药等领域,
                    <br />
                    低温条件下保留营养成分，提升产品稳定性与吸收率，
                    <br />
                    具备高效、连续化生产优势，支持多行业物料精细化处理需求
                  </p>
                  <button className="tech-button-right" onClick={() => navigate('/tech/hph')}>
                    <span className="vline"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="3">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span className="text">  查 看 详 情</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // HPH 分类详情页面 - 使用原来的结构和动画
          <div key={`hph-${animationKey}`} className="detail-page">
            <div className="detail-page__half detail-page__half--left">
              <div className="detail-page__skewed" style={{ backgroundColor: hphSelectedCategory.leftBgColor || '#17100f' }}>
                <div className="detail-page__content">
                  <h2 style={{ color: hphSelectedCategory.bgColor }}>{hphSelectedCategory.title}</h2>
                  <p>{hphSelectedCategory.description}</p>
                </div>
              </div>
            </div>
            <div className="detail-page__half detail-page__half--right">
              <div className="detail-page__skewed" style={{ backgroundColor: hphSelectedCategory.rightBg || '#2b1a17' }}>
                <div className="detail-page__content">
                  <h3>应用详情</h3>
                  <p>{hphSelectedCategory.details}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PEF Section - 第二页 */}
      <div className={`skw-page skw-page-2 ${focusedSection === 'pef' ? 'active' : ''}`}>
        {!pefShowCategory ? (
          // PEF 主页面
          <>
            <div className="skw-page__half skw-page__half--left">
              <div className="skw-page__skewed">
                <div className="skw-page__content">
                  <h2 className="skw-page__heading">
                    <div className="title-line-1">PEF</div>
                    <div className="title-line-2">超冰温·脉冲电场保鲜</div>
                  </h2>
                  <button className="tech-button" onClick={() => {
                    setCurrentVideoUrl('/videos/pef-demo.mp4');
                    setCurrentVideoTitle('PEF 超冰温·脉冲电场保鲜技术演示');
                    setIsVideoOpen(true);
                  }}>
                    <span className="vline"></span>
                    <span className="text">视 频 演 示</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="skw-page__half skw-page__half--right">
              <div className="skw-page__skewed">
                <div className="skw-page__content">
                  <p className="skw-page__description">
                  鎏鲜科技专注于冷链食材保鲜技术，
                    <br />
                    融合冰温保鲜、纳米微晶、超冷冰沙与全冷链系统
                    <br />
                    实现食材15天保持一级鲜度。
                  </p>
                  <p className="skw-page__description">
                  其"鲜到鲜"技术在不改变食材形态的前提下，
                    <br />
                    有效抑制冰晶生成，减少汁液流失，
                    <br />
                    适用于肉类、果蔬等多种场景，重新定义保鲜标准
                  </p>
                  <button className="tech-button-right" onClick={() => navigate('/tech/pef')}>
                    <span className="vline"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" strokeWidth="3">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    <span className="text ">查 看 详 情</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // PEF 分类详情页面 - 使用原来的结构和动画
          <div key={`pef-${animationKey}`} className="detail-page">
            <div className="detail-page__half detail-page__half--left">
              <div className="detail-page__skewed" style={{ backgroundColor: pefSelectedCategory.leftBgColor || '#17100f' }}>
                <div className="detail-page__content">
                  <h2 style={{ color: pefSelectedCategory.bgColor }}>{pefSelectedCategory.title}</h2>
                  <p>{pefSelectedCategory.description}</p>
                </div>
              </div>
            </div>
            <div className="detail-page__half detail-page__half--right">
              <div className="detail-page__skewed" style={{ backgroundColor: pefSelectedCategory.rightBg || '#2b1a17' }}>
                <div className="detail-page__content">
                  <h3>应用详情</h3>
                  <p>{pefSelectedCategory.details}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部导航条 - 只显示当前聚焦页面的导航 */}
      {focusedSection === 'hph' && !pefShowCategory && (
        <div className="category-navigation">
          <div className="category-nav-content">
            <div className="category-buttons">
              {/* The Mine按钮 */}
              <button
                className={`nav-btn ${!hphShowCategory ? 'active' : ''}`}
                onClick={handleMainPageClick}
              >
                <span className="text">The Mine</span>
              </button>

              {/* HPH品类按钮 */}
              {hphCategories.map((category) => (
                <button
                  key={`hph-${category.id}`}
                  className={`nav-btn ${hphSelectedCategory?.id === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category, 'hph')}
                >
                  <span className="text">{category.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {focusedSection === 'pef' && !hphShowCategory && (
        <div className="category-navigation">
          <div className="category-nav-content">
            <div className="category-buttons">
              {/* The Mine按钮 */}
              <button
                className={`nav-btn ${!pefShowCategory ? 'active' : ''}`}
                onClick={handleMainPageClick}
              >
                <span className="text">The Mine</span>
              </button>

              {/* PEF品类按钮 */}
              {pefCategories.map((category) => (
                <button
                  key={`pef-${category.id}`}
                  className={`nav-btn ${pefSelectedCategory?.id === category.id ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category, 'pef')}
                >
                  <span className="text">{category.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 极简视频播放窗口 */}
      {isVideoOpen && (
        <div className="minimal-video-overlay" onClick={() => setIsVideoOpen(false)}>
          <div className="minimal-video-container" onClick={(e) => e.stopPropagation()}>
            <div className="minimal-video-header">
              <h3 className="minimal-video-title">{currentVideoTitle}</h3>
              <button className="minimal-video-close" onClick={() => setIsVideoOpen(false)}>
                ×
              </button>
            </div>
            <div className="minimal-video-content">
              <video
                controls
                autoPlay
                src={currentVideoUrl}
                className="minimal-video-player"
              >
                您的浏览器不支持视频播放。
              </video>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TechShowcasePage;