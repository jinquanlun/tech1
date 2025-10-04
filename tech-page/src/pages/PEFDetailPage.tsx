import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DetailPage.css';

function PEFDetailPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    // 回到主页，但会到达技术展示页面（第二页）PEF部分而不是最后一页
    navigate('/', { state: { targetSection: 'pef' } });
  };

  return (
    <div className="detail-page-container">
      <nav className="detail-nav">
        <button onClick={handleBack} className="back-btn">←</button>
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


        {/* Technical Validation */}
        <section className="content-section">
          <div className="section-header">
            <h2>技术验证与测试</h2>
            <div className="section-line"></div>
          </div>

          <div className="validation-content">
            <div className="validation-item">
              <h3>VB-N/PH/色度测试：鲜到鲜技术，15天仍保持一级鲜</h3>
              <p>新鲜羊肉和牛肉在贮藏过程中，不同工况下对于羊肉和牛肉的挥发性盐基氮、菌落总数和色泽的影响。</p>
              <div className="test-charts">
                <img src="/images/pef-tech/vbn-test.png" alt="VB-N/PH/色度测试图表" />
              </div>
            </div>

            <div className="validation-item">
              <h3>15天保鲜效果实物对比</h3>
              <p>-4℃真空组的羊肉和所有牛肉样品在贮藏期结束后保存软鲜态，结论为一级鲜肉标准，表明冰温保鲜处理的牛羊肉贮藏15d也能保持食用品质。</p>
              <div className="comparison-images">
                <div className="comparison-group">
                  <h4>-4℃真空牛肉</h4>
                  <img src="/images/pef-tech/beef-comparison.png" alt="牛肉15天保鲜效果对比" />
                </div>
                <div className="comparison-group">
                  <h4>-4℃真空羊肉</h4>
                  <img src="/images/pef-tech/lamb-comparison.png" alt="羊肉15天保鲜效果对比" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Comparison */}
        <section className="content-section">
          <div className="section-header">
            <h2>竞品技术对比</h2>
            <div className="section-line"></div>
          </div>

          <div className="comparison-content">
            <div className="comparison-item">
              <h3>技术方案差异对比</h3>
              <div className="tech-comparison-table">
                <table>
                  <thead>
                    <tr>
                      <th>维度</th>
                      <th>恒磁养鲜</th>
                      <th>3代微晶（双层微晶）</th>
                      <th>2代微晶/AI抑霜冻</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>送风方式</td>
                      <td>抽屉环绕风循环</td>
                      <td>后部吹风</td>
                      <td>顶部吹风</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="airflow-diagrams">
                <img src="/images/pef-tech/airflow-diagram.png" alt="送风方式对比图" />
              </div>
            </div>


            <div className="comparison-item">
              <h3>鲜到鲜VS海尔恒磁VS美的微晶：技术对比详表</h3>
              <div className="detailed-comparison">
                <img src="/images/pef-tech/tech-comparison.png" alt="详细技术对比表" />
              </div>

              <div className="comparison-summary">
                <div className="summary-section">
                  <h4>对标结果分析：</h4>
                  <ul>
                    <li>竞品测试标准更接近实际用户场景，我司测试标准要求80%负载为极端状态。竞品标准有参考价值。</li>
                    <li>采用拉温段-回温段交替控温逻辑，在降温速率优势明显，但拉温段温度低，易造成局部食材过冻；海尔恒磁采用恒温控温逻辑，温度整体控制较均匀且稳定。</li>
                  </ul>
                </div>

                <div className="summary-section">
                  <h4>改善措施：</h4>
                  <ul>
                    <li>重新定义微晶技术要求（温度波动和均匀性）</li>
                    <li>修订微晶保鲜测试方法（负载量和食材种类）</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Advantages */}
        <section className="content-section">
          <div className="section-header">
            <h2>技术优势总结</h2>
            <div className="section-line"></div>
          </div>

          <div className="advantages-summary">
            <div className="advantage-highlight">
              <h3>鲜到鲜技术核心价值</h3>
              <p>鲜到鲜技术才能实现15天保持一级鲜，无需改变产品形态，实现真正的一级鲜保存。</p>
            </div>

            <div className="key-advantages">
              <div className="advantage-card">
                <h4>15天一级鲜</h4>
                <p>突破行业极限，实现肉类、鱼、水果等食材长达15天的"一级鲜"保鲜周期</p>
              </div>
              <div className="advantage-card">
                <h4>纳米微晶技术</h4>
                <p>独创纳米微晶保鲜技术，有效抑制冰晶生成，保持食材细胞完整性</p>
              </div>
              <div className="advantage-card">
                <h4>冰温精准控制</h4>
                <p>精准的冰温控制系统，确保食材在最佳保鲜温度区间内存储</p>
              </div>
              <div className="advantage-card">
                <h4>革命性常温配送</h4>
                <p>创新"工厂HPH处理 + 常温运输 + 终端智能冰温柜"新模式</p>
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
              <p>理工博士、高级产品经理、EMBA，家电从业近30年。在世界500强企业担任经营体、创新研究院负责人等职；并自主创业行业首家"3D曲面玻璃"等独角兽企业2家。国内外专利900多项，丰富的成熟企业管理和初创公司开拓经历，具有极强的市场开发能力，对技术创新转化敏锐度高。</p>
            </div>
            <div className="team-member">
              <h4>余铭</h4>
              <span className="title">首席科学家</span>
              <p>低温加工与保鲜技术首席，清华大学食品科学与工程领域教授、博导，广东省食品低温加工工程技术中心主任，专注于食品低温加工及冷链保鲜技术的研发与应用。研发冻眠保鲜技术，主导设计食品低温加工新装备，技术成果转化4项，获国内外专利10件（含美国专利2件）。</p>
            </div>
            <div className="team-member">
              <h4>陈昭民</h4>
              <span className="title">CTO</span>
              <p>中科院博士、高工、智能烹饪首席与AI算法专家。中科院计算机所研究员，行业首创"益生菌干式熟成技术"创始人，致力于智能烹饪、高端食材深加工、口味研究。有智能家电、食品加工、智能烹饪及机械装备跨行业整合经验，已创立多家技术创新型企业。</p>
            </div>
            <div className="team-member">
              <h4>方祥</h4>
              <span className="title">战略顾问</span>
              <p>国际多芬生物与微生物工程专家。华南农业大学博士后教授、博导，食品学院院长，生物工程专业主任，微生物发酵工程及相关领域的学科带头人。发明专利24项，国内外论文80多篇，为公司战略发展高级顾问。</p>
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
              <h4>鎏鲜愿景</h4>
              <p>重定食材保鲜温场标准，为健康生活保持自然！</p>
            </div>
            <div className="value-item">
              <h4>鎏鲜使命</h4>
              <p>以鲜为尺用科技锁住时间，让每一口食材如初摘般鲜活！</p>
            </div>
            <div className="value-item">
              <h4>鎏鲜价值观</h4>
              <p>产业赋能，以技术驱动生态链价值创新！</p>
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