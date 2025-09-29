import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/TechShowcasePage.css';

// 技术品类数据
const hphCategories = [
  {
    id: 1,
    title: "饮品与酱料",
    bgColor: "#de1663",
    leftBgColor: "#17100f",
    rightBg: "#2b1a17",
    description: "饮品赛道(黄金应用):",
    details: "鲜啤/精酿: 解决全程冷链、7天短保、风味流失痛点·实现'常温物流、长保质期、风味无损'，颠覆行业。NFC果汁/植物蛋白饮: 实现'无添加、长保质、口感细腻浓郁'，品质全面超越传统HPP及UHT技术产品。茶饮乳: 实现原料的纳米化破碎,获得极致顺滑、稳定不分层的高端口感。"
  },
  {
    id: 2,
    title: "保健品与医药",
    bgColor: "#ff9614",
    leftBgColor: "#270f03",
    rightBg: "#3d1a07",
    description: "保健品/母婴食品:",
    details: "纳米化提高营养成分的生物利用度和吸收率,低温工艺保护活性成分。中药材纳米萃取: 提高有效成分提取率和溶解度,实现100%原料利用。"
  },
  {
    id: 3,
    title: "化妆品",
    bgColor: "#03f4d3",
    leftBgColor: "#070f15",
    rightBg: "#17252f",
    description: "大健康与美妆赛道:",
    details: "通过纳米技术实现护肤成分的深层渗透，提高有效成分的生物利用度，打造更高效的美妆产品。"
  },
  {
    id: 4,
    title: "新能源材料",
    bgColor: "#ae2dff",
    leftBgColor: "#0d0b15",
    rightBg: "#1e0c29",
    description: "新能源材料应用:",
    details: "通过HPH技术实现材料的纳米级分散和均质化处理，提高新能源材料的性能和稳定性。"
  },
  {
    id: 5,
    title: "调味品与汤料",
    bgColor: "#efc053",
    leftBgColor: "#272118",
    rightBg: "#967954",
    description: "食品赛道:",
    details: "调味品(酱料、复合调味汁): 防止分层、析水,提升口感顺滑度和风味融合度。中式菜品全球化: 解决中餐酱料、汤品在海外运输中的沉淀、变质、风味改变问题。"
  },
  {
    id: 6,
    title: "生物科技",
    bgColor: "#ff6c00",
    leftBgColor: "#020104",
    rightBg: "#0d0c10",
    description: "生物科技应用:",
    details: "通过HPH技术实现生物制品的均质化处理，提高生物活性成分的稳定性和功效。"
  }
];

const pefCategories = [
  {
    id: 1,
    title: "高端生鲜肉禽",
    bgColor: "#de1663",
    leftBgColor: "#17100f",
    rightBg: "#2b1a17",
    description: "高端生鲜肉禽:",
    details: "通过PEF脉冲电场技术，在不破坏肉质纤维的前提下，有效杀灭致病菌，延长保鲜期，保持肉类的原始风味和营养价值。"
  },
  {
    id: 2,
    title: "预制菜与即食产品",
    bgColor: "#ff9614",
    leftBgColor: "#270f03",
    rightBg: "#3d1a07",
    description: "预制菜与即食产品:",
    details: "采用超冰温保鲜技术，确保预制菜品在长期储存过程中保持最佳的口感、营养和安全性，满足现代快节奏生活需求。"
  },
  {
    id: 3,
    title: "精品水果与蔬菜",
    bgColor: "#03f4d3",
    leftBgColor: "#070f15",
    rightBg: "#17252f",
    description: "精品水果与蔬菜:",
    details: "通过脉冲电场保鲜技术，有效延长高端果蔬的保鲜期，保持其原有的色泽、口感和营养成分，提升产品附加值。"
  },
  {
    id: 4,
    title: "乳制品与蛋类",
    bgColor: "#ae2dff",
    leftBgColor: "#0d0b15",
    rightBg: "#1e0c29",
    description: "乳制品与蛋类:",
    details: "采用低温脉冲电场技术，在保持蛋白质活性的同时，有效杀灭有害微生物，延长产品保质期，保证食品安全。"
  },
  {
    id: 5,
    title: "花卉与药用植物",
    bgColor: "#efc053",
    leftBgColor: "#272118",
    rightBg: "#967954",
    description: "花卉与药用植物:",
    details: "通过精确的温度控制和脉冲电场处理，延长鲜花和药用植物的保鲜期，保持其有效成分和观赏价值。"
  },
  {
    id: 6,
    title: "医药冷链",
    bgColor: "#ff6c00",
    leftBgColor: "#020104",
    rightBg: "#0d0c10",
    description: "医药冷链:",
    details: "专为医药产品设计的超冰温保鲜技术，确保疫苗、生物制剂等医药产品在运输储存过程中的稳定性和有效性。"
  },
  {
    id: 7,
    title: "饮料与酒类",
    bgColor: "#40ffd9",
    leftBgColor: "#001013",
    rightBg: "#458276",
    description: "饮料与酒类:",
    details: "采用脉冲电场技术对饮料和酒类进行处理，在保持原有风味的基础上，延长产品保质期，提升产品品质。"
  }
];

const TechShowcasePage: React.FC = () => {
  const navigate = useNavigate();
  const [focusedSection, setFocusedSection] = useState<'hph' | 'pef'>('hph'); // 当前聚焦区域
  const [scrolling, setScrolling] = useState(false);

  // 分别管理两个区域的状态
  const [hphSelectedCategory, setHphSelectedCategory] = useState<any>(null);
  const [hphShowCategory, setHphShowCategory] = useState(false);
  const [pefSelectedCategory, setPefSelectedCategory] = useState<any>(null);
  const [pefShowCategory, setPefShowCategory] = useState(false);

  const animTime = 1000;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 粒子动画相关
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: any[] = [];
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
      x: number;
      y: number;
      vy: number;
      radius: number;

      constructor(index: number) {
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
    const distance = (p1: Particle, p2: Particle) => {
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

  const switchFocus = (section: 'hph' | 'pef') => {
    // 现在允许在任何时候切换聚焦，因为区域独立
    setScrolling(true);
    setFocusedSection(section);

    setTimeout(() => {
      setScrolling(false);
    }, animTime);
  };

  const handleCategoryClick = (category: any, section: 'hph' | 'pef') => {
    if (section === 'hph') {
      setHphSelectedCategory(category);
      setHphShowCategory(true);
    } else {
      setPefSelectedCategory(category);
      setPefShowCategory(true);
    }
  };

  const handleMainPageClick = () => {
    // 返回主页时清除所有分类详情
    setHphShowCategory(false);
    setHphSelectedCategory(null);
    setPefShowCategory(false);
    setPefSelectedCategory(null);
  };

  const navigateUp = () => {
    if (focusedSection === 'pef') {
      switchFocus('hph');
    }
  };

  const navigateDown = () => {
    if (focusedSection === 'hph') {
      switchFocus('pef');
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // 如果正在显示分类详情，禁用滚动切换
      if (scrolling || hphShowCategory || pefShowCategory) return;

      e.preventDefault();

      if (e.deltaY > 0) {
        navigateDown();
      } else {
        navigateUp();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // 如果正在显示分类详情，禁用键盘导航
      if (scrolling || hphShowCategory || pefShowCategory) return;

      if (e.key === 'ArrowUp') { // Arrow Up
        navigateUp();
      } else if (e.key === 'ArrowDown') { // Arrow Down
        navigateDown();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusedSection, scrolling, hphShowCategory, pefShowCategory]);

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
                  <button className="tech-button" onClick={() => navigate('/video/hph')}>
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
                    <span className="text">查 看 详 情</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // HPH 分类详情页面
          <div className="category-detail-overlay">
            <div key={hphSelectedCategory.id} className="detail-page">
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
                  <button className="tech-button" onClick={() => navigate('/video/pef')}>
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
                  其“鲜到鲜”技术在不改变食材形态的前提下，
                    <br />
                    有效抑制冰晶生成，减少汁液流失，
                    <br />
                    适用于肉类、果蔬等多种场景，重新定义保鲜标准
                  </p>
                  <button className="tech-button-right" onClick={() => navigate('/tech/pef')}>
                    <span className="vline"></span>
                    <span className="text"> 查 看 详 情</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // PEF 分类详情页面
          <div className="category-detail-overlay">
            <div key={pefSelectedCategory.id} className="detail-page">
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

    </div>
  );
};

export default TechShowcasePage;