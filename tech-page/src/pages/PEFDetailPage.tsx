import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DetailPage.css';

function PEFDetailPage() {
  const navigate = useNavigate();

  return (
    <div className="detail-page-container">
      <nav className="detail-nav">
        <button onClick={() => navigate('/')} className="back-btn">←</button>
      </nav>

      <main className="detail-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">鎏鲜科技</h1>
            <p className="hero-subtitle">PEF</p>
            <div className="hero-description">
              <p>15天一级鲜，重塑冷链保鲜标准</p>
              <p>以鲜为尺，用科技锁住时间，让每一口食材如初摘般鲜活</p>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="content-section">
          <div className="section-header">
            <h2>行业痛点</h2>
            <div className="section-line"></div>
          </div>
          <div className="content-grid">
            <div className="content-block">
              <h3>保质期过短</h3>
              <p>鲜啤、鲜肉等产品货架期极短，通常只有几天，导致销售半径受限，损耗率高。</p>
            </div>
            <div className="content-block">
              <h3>冷链成本高昂</h3>
              <p>全程低温冷链物流、专业设备和仓储投入巨大，成本最终转嫁给消费者。</p>
            </div>
            <div className="content-block">
              <h3>品质易损耗</h3>
              <p>温度波动破坏食材细胞结构，导致风味变差、营养流失。</p>
            </div>
            <div className="content-block">
              <h3>服务要求严苛</h3>
              <p>高品质生鲜的储存和处理需要专业设备和人员培训，增加运营难度。</p>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="content-section">
          <div className="section-header">
            <h2>解决方案</h2>
            <div className="section-line"></div>
          </div>
          <div className="solution-content">
            <div className="solution-highlight">
              <h3>鎏鲜"鲜到鲜"全链路保鲜技术</h3>
              <p>颠覆性的全链路技术解决方案，不仅延长保鲜期，更能重构供应链，大幅降低成本。</p>
            </div>

            <div className="advantages-grid">
              <div className="advantage-item">
                <h4>15天超长"一级鲜"</h4>
                <p>突破行业极限的冰温抑菌保鲜技术，实现肉类、鱼、水果等食材长达15天的"一级鲜"保鲜周期。</p>
                <span className="advantage-note">市场主流技术保鲜期多为7-10天</span>
              </div>

              <div className="advantage-item">
                <h4>革命性"常温配送"</h4>
                <p>独创的"工厂HPH处理 + 常温运输 + 终端智能冰温柜"新模式。</p>
                <div className="process-steps">
                  <div className="step">
                    <span className="step-number">01</span>
                    <span className="step-text">工厂端HPH预处理</span>
                  </div>
                  <div className="step">
                    <span className="step-number">02</span>
                    <span className="step-text">常温运输</span>
                  </div>
                  <div className="step">
                    <span className="step-number">03</span>
                    <span className="step-text">终端智能冰温柜</span>
                  </div>
                </div>
              </div>

              <div className="advantage-item">
                <h4>锁住原鲜营养</h4>
                <p>"冻眠冰温保鲜"与"纳米微晶"技术，有效抑制冰晶生成，保持食材细胞完整性。</p>
                <span className="advantage-note">防止汁液流失，锁住原始风味、营养和口感</span>
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="content-section">
          <div className="section-header">
            <h2>应用场景</h2>
            <div className="section-line"></div>
          </div>
          <div className="application-grid">
            <div className="app-category">
              <h3>高端肉品</h3>
              <div className="app-items">
                <div className="app-item">
                  <h4>"冻眠一级鲜"</h4>
                  <p>牛羊肉在-4℃真空环境下可存储15天，仍保持软鲜态和一级品质</p>
                </div>
                <div className="app-item">
                  <h4>无损加工</h4>
                  <p>可在-6℃下轻松实现牛肉薄切，解冻快速且无血水流失</p>
                </div>
              </div>
            </div>

            <div className="app-category">
              <h3>新式饮品</h3>
              <div className="app-items">
                <div className="app-item">
                  <h4>DIY冰沙饮</h4>
                  <p>"超冷沙冰柜"让饮品保持过冷状态，轻轻一摇即可变成冰沙</p>
                </div>
                <div className="app-item">
                  <h4>精酿鲜啤</h4>
                  <p>彻底解决鲜啤销售半径小的难题，帮助品牌轻松触达全国市场</p>
                </div>
              </div>
            </div>

            <div className="app-category">
              <h3>果蔬生鲜</h3>
              <div className="app-items">
                <div className="app-item">
                  <h4>水果蔬菜</h4>
                  <p>同样适用于各类水果、蔬菜的长效保鲜，保持"如初摘般"的新鲜度</p>
                </div>
                <div className="app-item">
                  <h4>水产品</h4>
                  <p>海鲜产品的超长保鲜，维持最佳品质和口感</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="content-section">
          <div className="section-header">
            <h2>权威技术团队</h2>
            <div className="section-line"></div>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <h4>季俊生</h4>
              <span className="title">CEO</span>
              <p>理工博士，家电行业近30年经验，曾任世界500强企业高管并成功创办独角兽企业</p>
            </div>
            <div className="team-member">
              <h4>余铭</h4>
              <span className="title">首席科学家</span>
              <p>清华大学食品科学与工程领域教授、博导，专注于食品低温加工及冷链保鲜技术</p>
            </div>
            <div className="team-member">
              <h4>陈昭民</h4>
              <span className="title">CTO</span>
              <p>中科院博士与AI算法专家，行业首创"益生菌干式熟成技术"创始人</p>
            </div>
            <div className="team-member">
              <h4>方祥</h4>
              <span className="title">战略顾问</span>
              <p>华南农业大学博士后教授、食品学院院长，生物与微生物工程领域权威专家</p>
            </div>
          </div>
        </section>

        {/* Company Values */}
        <section className="content-section company-section">
          <div className="section-header">
            <h2>关于鎏鲜</h2>
            <div className="section-line"></div>
          </div>
          <div className="values-content">
            <div className="value-item">
              <h4>愿景</h4>
              <p>重定食材保鲜温场标准，为健康生活保持自然</p>
            </div>
            <div className="value-item">
              <h4>使命</h4>
              <p>以鲜为尺，用科技锁住时间，让每一口食材如初摘般鲜活</p>
            </div>
            <div className="value-item">
              <h4>价值观</h4>
              <p>产业赋能，以技术驱动生态链价值创新</p>
            </div>
          </div>
          <div className="company-footer">
            <p>联系我们，开启您的15天保鲜新时代</p>
            <span className="company-lab">鎏鲜全球鲜味创新实验室</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default PEFDetailPage