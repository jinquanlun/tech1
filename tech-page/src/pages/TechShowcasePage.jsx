import { useEffect, useState, useRef, memo } from 'react';
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

  // 高性能粒子动画系统（对象池+FPS监控+内存优化）
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 尝试使用OffscreenCanvas（如果支持）进行后台渲染
    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true, // 提高性能
      willReadFrequently: false // 优化写入性能
    });
    if (!ctx) return;

    let animationId;
    let particles = [];
    let onMobile = window.innerWidth < 768;

    // 渲染控制优化
    let isTabVisible = true;
    let lastRenderTime = 0;
    const TARGET_FRAME_TIME = 1000 / 60; // 60FPS目标

    // 性能监控变量
    let fps = 60;
    let frameCount = 0;
    let lastTime = performance.now();
    let fpsCheckInterval = 30; // 每30帧检查一次FPS

    // 内存优化: 缓存颜色字符串避免重复创建
    const PARTICLE_OUTER_COLOR = "rgba(255,255,255,0.95)";
    const PARTICLE_INNER_COLOR = "#ffffff";
    const BG_COLOR_HPH = "rgba(10, 10, 10, 0.3)";
    const BG_COLOR_PEF = "rgba(26, 29, 36, 0.3)";

    // 页面可见性检测优化
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (!isTabVisible) {
        // 页面不可见时降低渲染频率
        cancelAnimationFrame(animationId);
      } else {
        // 页面重新可见时恢复渲染
        draw();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 对象池：预分配连线对象避免GC
    const connectionPool = [];
    const MAX_CONNECTIONS = 200; // 最大连线数
    let activeConnections = 0;

    // 初始化连线对象池
    for (let i = 0; i < MAX_CONNECTIONS; i++) {
      connectionPool.push({
        x1: 0, y1: 0, x2: 0, y2: 0,
        opacity: 0, lineWidth: 0, active: false
      });
    }

    // 预计算缓存系统（借鉴WebGL项目思路）
    const mathCache = {
      sin: new Float32Array(360), // 预计算sin值
      cos: new Float32Array(360), // 预计算cos值
      sqrt: new Map(), // 缓存sqrt计算结果
    };

    // 初始化数学函数缓存
    for (let i = 0; i < 360; i++) {
      const rad = (i * Math.PI) / 180;
      mathCache.sin[i] = Math.sin(rad);
      mathCache.cos[i] = Math.cos(rad);
    }

    // 缓存常用计算结果
    let cachedTime = 0;

    // 设置canvas尺寸
    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      // 先不缩放，避免渲染问题
    };

    resizeCanvas();

    // 动态粒子数量管理
    const getOptimalParticleCount = (targetFps = 30) => {
      const base = onMobile ? window.innerWidth / 130 : window.innerWidth / 70;
      let optimal = Math.floor(base);

      // 根据FPS动态调整
      if (fps < targetFps) {
        optimal = Math.max(optimal * 0.7, onMobile ? 8 : 15);
      } else if (fps > 50) {
        optimal = Math.min(optimal * 1.2, onMobile ? 25 : 45);
      }

      // 设置边界
      if (optimal < (onMobile ? 8 : 15)) optimal = onMobile ? 8 : 15;
      if (optimal > (onMobile ? 25 : 45)) optimal = onMobile ? 25 : 45;

      return Math.floor(optimal);
    };

    let particleNum = getOptimalParticleCount();

    // 自适应连接距离
    const getOptimalDistance = () => {
      const base = window.innerWidth / 5;
      const fpsMultiplier = fps < 30 ? 0.8 : (fps > 50 ? 1.2 : 1.0);
      let dist = base * fpsMultiplier;

      if (dist < 180) dist = 180;
      else if (dist > 300) dist = 300;
      return dist;
    };

    let minDist = getOptimalDistance();


    // 高效缓存的sqrt函数（避免重复计算）
    const cachedSqrt = (value) => {
      const key = Math.round(value * 100); // 精度到小数点后2位
      if (!mathCache.sqrt.has(key)) {
        mathCache.sqrt.set(key, Math.sqrt(value));
        // 限制缓存大小，避免内存泄漏
        if (mathCache.sqrt.size > 1000) {
          const firstKey = mathCache.sqrt.keys().next().value;
          mathCache.sqrt.delete(firstKey);
        }
      }
      return mathCache.sqrt.get(key);
    };

    // 优化的粒子类（使用缓存数学函数）
    class Particle {
      constructor(index) {
        this.x = index * (window.innerWidth / particleNum);
        this.y = Math.random() * window.innerHeight;
        this.vy = (Math.random() * -1) / 3;
        this.radius = 1.5;
        this.innerRadius = 0.9;
        this.intX = Math.round(this.x);
        this.intY = Math.round(this.y);

        // 预计算一些常用值
        this.radiusPi2 = Math.PI * 2;
        this.innerRadiusPi2 = Math.PI * 2;
      }

      // 移除draw方法，使用批量绘制提高性能
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

    // 优化的更新函数 - 减少计算频率

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

      // 高性能连线计算：使用对象池避免GC
      activeConnections = 0;
      const maxDistSquared = minDist * minDist;

      // 重置对象池
      for (let i = 0; i < connectionPool.length; i++) {
        connectionPool[i].active = false;
      }

      const len = particles.length;
      for (let i = 0; i < len && activeConnections < MAX_CONNECTIONS; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < len && activeConnections < MAX_CONNECTIONS; j++) {
          const p2 = particles[j];

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSquared = dx * dx + dy * dy;

          if (distSquared <= maxDistSquared) {
            const conn = connectionPool[activeConnections];
            const dist = cachedSqrt(distSquared); // 使用缓存的sqrt
            const distRatio = 1 - dist / minDist;

            // 复用对象而非创建新对象
            conn.x1 = p1.intX;
            conn.y1 = p1.intY;
            conn.x2 = p2.intX;
            conn.y2 = p2.intY;
            conn.opacity = Math.max(0.3, 0.9 * distRatio);
            conn.lineWidth = Math.max(1.0, 2.0 * distRatio);
            conn.active = true;

            activeConnections++;
          }
        }
      }
    };

    // 高度优化的主绘制循环（智能渲染控制）
    const draw = () => {
      const currentTime = performance.now();

      // 智能帧率控制（借鉴WebGL项目思路）
      if (!isTabVisible) {
        // 页面不可见时降低渲染频率
        setTimeout(() => {
          if (isTabVisible) draw();
        }, 100);
        return;
      }

      // 限制渲染频率，避免不必要的高频渲染
      if (currentTime - lastRenderTime < TARGET_FRAME_TIME) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      lastRenderTime = currentTime;

      paintCanvas();

      // 使用对象池绘制连线 - 只绘制活跃连接
      for (let i = 0; i < activeConnections; i++) {
        const conn = connectionPool[i];
        if (conn.active) {
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

      // FPS监控和性能调优
      frameCount++;
      if (frameCount >= fpsCheckInterval) {
        const currentTime = performance.now();
        const deltaTime = currentTime - lastTime;
        fps = Math.round((frameCount * 1000) / deltaTime);
        frameCount = 0;
        lastTime = currentTime;

        // 自适应性能调整
        const newParticleNum = getOptimalParticleCount();
        if (newParticleNum !== particleNum) {
          particleNum = newParticleNum;
          initParticles();
        }

        // 动态调整连接距离
        minDist = getOptimalDistance();

      }

      update();
      animationId = requestAnimationFrame(draw);
    };

    // 智能resize处理
    const handleResize = () => {
      onMobile = window.innerWidth < 768;
      resizeCanvas();

      // 重新计算最优参数
      particleNum = getOptimalParticleCount();
      minDist = getOptimalDistance();
      initParticles();
    };

    // 添加事件监听
    window.addEventListener('resize', handleResize);

    // 开始动画
    draw();

    // 强化的清理函数（防止内存泄漏+缓存清理）
    return () => {
      // 清理动画
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }

      // 清理事件监听
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      // 清理粒子数组
      particles.length = 0;
      particles = null;

      // 清理对象池
      connectionPool.length = 0;

      // 清理数学缓存
      mathCache.sqrt.clear();

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

export default memo(TechShowcasePage);