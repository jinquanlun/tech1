import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DetailPage.css';

function HPHDetailPage() {
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
            <h1 className="hero-title">超高压纳米破碎技术</h1>
            <p className="hero-subtitle">HPH</p>
            <div className="hero-description">
              <p>全球专业超高压设备供应商</p>
              <p>专为化妆品、制药、食品、饮料、化工及矿物等行业打造的尖端解决方案</p>
            </div>
          </div>
        </section>

        {/* Technical Principles */}
        <section className="content-section">
          <div className="section-header">
            <h2>技术原理</h2>
            <div className="section-line"></div>
          </div>
          <div className="content-grid">
            <div className="content-block">
              <h3>HPH超高压动态处理</h3>
              <p>通过300~400兆帕(MPa)的超高压力驱动物料高速通过微米级的均质阀，在毫秒级时间内经历三重强大的物理作用，实现高效的破碎与灭菌。</p>
            </div>
            <div className="content-block">
              <h3>三重物理作用</h3>
              <ul className="tech-list">
                <li><strong>空穴效应</strong> — 压力骤降引发液体内部形成空化气泡并瞬间爆裂</li>
                <li><strong>湍流剪切</strong> — 物料被加速至超音速，在高强度剪切力作用下被撕裂</li>
                <li><strong>碰撞破碎</strong> — 高速射流猛烈撞击，进一步粉碎固体颗粒</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Breaking Effect */}
        <section className="content-section">
          <div className="section-header">
            <h2>破碎效果</h2>
            <div className="section-line"></div>
          </div>
          <div className="content-grid">
            <div className="effect-item">
              <span className="effect-name">纤维素纳米晶</span>
              <span className="effect-value">100~200nm</span>
            </div>
            <div className="effect-item">
              <span className="effect-name">甲壳素纳米晶</span>
              <span className="effect-value">50~70nm</span>
            </div>
            <div className="effect-item">
              <span className="effect-name">脂质体</span>
              <span className="effect-value">≤100nm</span>
            </div>
            <div className="effect-item">
              <span className="effect-name">石墨烯</span>
              <span className="effect-value">单层剥离</span>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="content-section">
          <div className="section-header">
            <h2>应用领域</h2>
            <div className="section-line"></div>
          </div>
          <div className="application-grid">
            <div className="app-category">
              <h3>食品饮料</h3>
              <div className="app-items">
                <div className="app-item">
                  <h4>NFC果汁</h4>
                  <p>完美保留天然风味与营养，果汁更浓稠且不易沉淀</p>
                </div>
                <div className="app-item">
                  <h4>全豆豆奶</h4>
                  <p>大豆100%利用，破碎颗粒仅50~200纳米，极易被人体吸收</p>
                </div>
              </div>
            </div>

            <div className="app-category">
              <h3>生物制药</h3>
              <div className="app-items">
                <div className="app-item">
                  <h4>细胞破碎</h4>
                  <p>高效破碎细菌、酵母细胞，释放内部的蛋白质、酶等生物活性物质</p>
                </div>
                <div className="app-item">
                  <h4>中草药萃取</h4>
                  <p>将药材处理成纳米级颗粒，显著提高有效成分的溶解和释放速度</p>
                </div>
              </div>
            </div>

            <div className="app-category">
              <h3>化妆品日化</h3>
              <div className="app-items">
                <div className="app-item">
                  <h4>乳液面霜</h4>
                  <p>确保油相和水相充分混合，显著提升产品质感和皮肤吸收性</p>
                </div>
                <div className="app-item">
                  <h4>防晒产品</h4>
                  <p>均匀分散活性成分，提高防晒效果和肤感</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Info */}
        <section className="content-section company-section">
          <div className="section-header">
            <h2>DARDI</h2>
            <div className="section-line"></div>
          </div>
          <div className="company-content">
            <div className="company-stats">
              <div className="stat-item">
                <span className="stat-number">1996</span>
                <span className="stat-label">创建年份</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">30年</span>
                <span className="stat-label">研发经验</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">全球用户</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">60+</span>
                <span className="stat-label">出口国家</span>
              </div>
            </div>
            <div className="company-description">
              <p>南京大地水刀股份有限公司，中国超高压水射流应用技术的先行者，位居全球前列的国家高新技术企业。</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HPHDetailPage