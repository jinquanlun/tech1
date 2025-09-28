import React, { useEffect, useState } from 'react';
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

      if (e.which === 38) { // Arrow Up
        navigateUp();
      } else if (e.which === 40) { // Arrow Down
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
                    <span className="text">Video</span>
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
                    <span className="text">Detail</span>
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
                    <span className="text">Video</span>
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
                    <span className="text">Detail</span>
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