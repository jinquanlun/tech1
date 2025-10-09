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

  // 粒子动画相关（内存优化版）
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let particles = [];
    let onMobile = window.innerWidth < 768;

    // 内存优化: 缓存颜色字符串避免重复创建
    const PARTICLE_OUTER_COLOR = "rgba(255,255,255,0.95)";
    const PARTICLE_INNER_COLOR = "#ffffff";
    const BG_COLOR_HPH = "rgba(10, 10, 10, 0.3)";
    const BG_COLOR_PEF = "rgba(26, 29, 36, 0.3)";

    // 缓存常用计算结果
    let cachedTime = 0;
    let lastTimeUpdate = 0;

    // 设置canvas尺寸
    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      // 先不缩放，避免渲染问题
    };

    resizeCanvas();

    // 恢复原始粒子数量，保持视觉效果
    let particleNum = onMobile ? Math.floor(window.innerWidth / 130) : Math.floor(window.innerWidth / 70);
    // 设置合理的粒子数量范围，保持视觉效果但避免性能问题
    if (particleNum < (onMobile ? 10 : 20)) particleNum = onMobile ? 10 : 20;
    if (particleNum > (onMobile ? 18 : 35)) particleNum = onMobile ? 18 : 35;

    // 增大连接距离以增强连线效果
    let minDist = window.innerWidth / 5; // 从1/6改为1/5，增大连接距离
    if (minDist < 200) minDist = 200; // 提高最小距离
    else if (minDist > 280) minDist = 280; // 提高最大距离

    // 移除未使用的鼠标事件变量

    // 最简化粒子类（保持原始效果）
    class Particle {
      constructor(index) {
        this.x = index * (window.innerWidth / particleNum);
        this.y = Math.random() * window.innerHeight;
        this.vy = (Math.random() * -1) / 3;
        this.radius = 1.5;
        this.innerRadius = 0.9;
        this.intX = Math.round(this.x);
        this.intY = Math.round(this.y);
      }

      draw() {
        if (!ctx) return;

        // 保持原始双圆效果
        ctx.fillStyle = PARTICLE_OUTER_COLOR;
        ctx.beginPath();
        ctx.arc(this.intX, this.intY, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = PARTICLE_INNER_COLOR;
        ctx.beginPath();
        ctx.arc(this.intX, this.intY, this.innerRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      updatePosition() {
        this.intX = Math.round(this.x);
        this.intY = Math.round(this.y);
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

    // 优化的背景绘制（动态获取当前状态）
    const paintCanvas = () => {
      if (!ctx) return;
      // 动态获取当前focusedSection状态，而不依赖useEffect
      const currentSection = document.querySelector('.skw-page.active')?.classList.contains('skw-page-1') ? 'hph' : 'pef';
      const bgColor = currentSection === 'hph' ? BG_COLOR_HPH : BG_COLOR_PEF;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };

    // 注释：distance函数已内联到主循环中以优化性能

    // 优化的更新函数 - 减少计算频率
    let frameCount = 0;
    let connectionUpdateFrame = 0;
    const connections = []; // 缓存连接状态

    const update = () => {
      const now = Date.now();
      // 每帧都更新时间，保持最佳流畅度
      cachedTime = now * 0.0008;

      const amplitude = onMobile ? window.innerWidth / 25 : window.innerWidth / 18;
      let theta = cachedTime; // 简化时间计算
      const dx = (Math.PI * 2) / particleNum;
      frameCount++;

      // 更新粒子位置
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!onMobile) {
          // 恢复原始桌面端多层次运动
          const waveOffset = i * dx;
          const speedVariation = 1 + (i % 3) * 0.2;

          if (i % 3 === 0) {
            p.y = window.innerHeight * 0.3 + Math.sin(theta * speedVariation + waveOffset) * amplitude;
          } else if (i % 3 === 1) {
            p.y = window.innerHeight * 0.5 + Math.cos(theta * speedVariation + waveOffset) * amplitude * 0.8;
          } else {
            p.y = window.innerHeight * 0.7 + Math.sin(theta * speedVariation + waveOffset + Math.PI/3) * amplitude * 0.6;
          }
        } else {
          p.y += p.vy;
          if (p.y > window.innerHeight || p.y < 0) {
            p.vy = -p.vy;
          }
        }

        // 恢复原始边界检查
        if (p.x + p.radius > window.innerWidth) p.x = p.radius;
        else if (p.x - p.radius < 0) p.x = window.innerWidth - p.radius;
        if (p.y + p.radius > window.innerHeight) p.y = p.radius;
        else if (p.y - p.radius < 0) p.y = window.innerHeight - p.radius;

        // 更新整数坐标缓存
        p.updatePosition();
      }

      // 简化连线计算 - 移除帧数限制，恢复原始流畅度
      connectionUpdateFrame++;
      connections.length = 0;

      const len = particles.length;
      const maxDistSquared = minDist * minDist;

      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSquared = dx * dx + dy * dy;

          if (distSquared <= maxDistSquared) {
            const dist = Math.sqrt(distSquared);
            const distRatio = 1 - dist / minDist;
            const opacity = Math.max(0.3, 0.9 * distRatio);
            const lineWidth = Math.max(1.0, 2.0 * distRatio);

            connections.push({
              x1: p1.intX,
              y1: p1.intY,
              x2: p2.intX,
              y2: p2.intY,
              opacity: Math.round(opacity * 100) / 100,
              lineWidth: lineWidth
            });
          }
        }
      }
    };

    // 高度优化的主绘制循环
    const draw = () => {
      paintCanvas();

      // 恢复原始连线绘制方式 - 每条线单独绘制以保持完整效果
      if (connections.length > 0) {
        for (let i = 0; i < connections.length; i++) {
          const conn = connections[i];
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${conn.opacity})`;
          ctx.lineWidth = conn.lineWidth;
          ctx.moveTo(conn.x1, conn.y1);
          ctx.lineTo(conn.x2, conn.y2);
          ctx.stroke();
        }
      }

      // 批量绘制粒子 - 减少状态切换
      ctx.fillStyle = PARTICLE_OUTER_COLOR;
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.moveTo(p.intX + p.radius, p.intY);
        ctx.arc(p.intX, p.intY, p.radius, 0, Math.PI * 2);
      }
      ctx.fill();

      ctx.fillStyle = PARTICLE_INNER_COLOR;
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.moveTo(p.intX + p.innerRadius, p.intY);
        ctx.arc(p.intX, p.intY, p.innerRadius, 0, Math.PI * 2);
      }
      ctx.fill();

      update();
      animationId = requestAnimationFrame(draw);
    };

    // 移除鼠标事件处理，简化性能

    const handleResize = () => {
      onMobile = window.innerWidth < 768;
      resizeCanvas();
      // 使用原始粒子数量计算
      particleNum = onMobile ? Math.floor(window.innerWidth / 130) : Math.floor(window.innerWidth / 70);
      if (particleNum < (onMobile ? 10 : 20)) particleNum = onMobile ? 10 : 20;
      if (particleNum > (onMobile ? 18 : 35)) particleNum = onMobile ? 18 : 35;
      minDist = window.innerWidth / 5;
      if (minDist < 200) minDist = 200;
      else if (minDist > 280) minDist = 280;
      initParticles();
    };

    // 添加事件监听
    window.addEventListener('resize', handleResize);

    // 开始动画
    draw();

    // 强化的清理函数（防止内存泄漏）
    return () => {
      // 清理动画
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }

      // 清理事件监听
      window.removeEventListener('resize', handleResize);

      // 清理粒子数组
      particles.length = 0;
      particles = null;

      // 清理Canvas上下文
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, []); // 只初始化一次，不依赖focusedSection


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