import { useNavigate } from 'react-router-dom';
import '../styles/DetailPage.css';

function HPHDetailPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    // 回到主页，但会到达技术展示页面（第二页）而不是最后一页
    navigate('/', { state: { targetSection: 'hph' } });
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
            <h1 className="hero-title">大地水刀</h1>
            <p className="hero-subtitle">HPH</p>
            <div className="hero-description">
              <p>超高压纳米破碎技术</p>
              <p>全球专业超高压设备供应商，始于1996年</p>
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section className="content-section">
          <div className="section-header">
            <h2>破碎特点</h2>
            <div className="section-line"></div>
          </div>
          <div className="content-grid">
            <div className="content-block">
              <h3>超高压纳米破碎头</h3>
              <p>大地综合型/H型均质阀：该结构较H型、Y型均质头对于物料的破碎与剥离效果有明显提升。该系统支持模块化扩展，通过在出料端配置H型均质模块进行二次处理，可达成纳米级分散与多相体系均质化的双重工艺目标。</p>
              <div className="tech-image">
                <img src="/images/hph-tech/breaking-head.png" alt="超高压纳米破碎头" />
              </div>
            </div>
            <div className="content-block">
              <h3>超高压纳米破碎效果</h3>
              <p>样品均质效果显著：纤维素纳米晶长度100~200nm；甲壳素纳米晶直径50~70nm；石墨烯制备剥离可达单层；脂质体可以做到100nm以下；食品样品制备可达纳米级别，纯绿色，无添加。</p>
              <div className="tech-image">
                <img src="/images/hph-tech/breaking-effect.png" alt="超高压纳米破碎效果" />
              </div>
            </div>
            <div className="content-block">
              <h3>HPH超高压动态灭菌</h3>
              <p>通过300~400兆帕（MPa）超高压力驱动，在极短时间（毫秒级）内经历三重物理作用：空穴效应、湍流剪切、碰撞破碎，直接破坏微生物细胞结构，实现物理灭活。</p>
            </div>
            <div className="content-block">
              <h3>技术独特优势</h3>
              <p>同步均破碎：在灭菌同时破碎果肉颗粒（粒径可降至100nm~150nm）；低温高效：全程低温，保留热敏性营养素；连续化生产：适用于工业化管道式流水线，处理能力达5~10吨/小时。</p>
            </div>
          </div>
        </section>

        {/* Application Cases */}
        <section className="content-section">
          <div className="section-header">
            <h2>应用案例</h2>
            <div className="section-line"></div>
          </div>
          <div className="application-grid">
            <div className="app-category">
              <h3>化妆品</h3>
              <div className="app-items">
                <div className="app-item">
                  <h4>乳液、面霜、皮肤护理</h4>
                  <p>防晒霜等产品的纳米级分散，提升产品质感和皮肤吸收性</p>
                </div>
                <div className="app-item">
                  <h4>纳米材料分散</h4>
                  <p>帮助新能源分散纳米材料(CNT、硅、石墨烯等)应用于光伏电池、燃料电池</p>
                </div>
              </div>
            </div>

            <div className="app-category">
              <h3>果汁和饮料</h3>
              <div className="app-items">
                <div className="app-item">
                  <h4>细胞破裂技术</h4>
                  <p>大肠杆菌、酵母细胞、真菌、细菌，帮助细胞快速破裂</p>
                </div>
                <div className="app-item">
                  <h4>果汁稳定化</h4>
                  <p>均质可以使果汁中的果肉颗粒细小化，增加汁液的稳定性和口感</p>
                </div>
              </div>
            </div>

            <div className="app-category">
              <h3>药品与生物制药</h3>
              <div className="app-items">
                <div className="app-item">
                  <h4>药物制剂</h4>
                  <p>注射剂、抗生素、吸入物、麻醉药、类固醇、药膏等的纳米级制备</p>
                </div>
                <div className="app-item">
                  <h4>脂质体制备</h4>
                  <p>用于药物递送系统，缩小脂质体尺寸，提高均匀性和装载效率</p>
                </div>
              </div>
            </div>

            <div className="app-category">
              <h3>化工材料</h3>
              <div className="app-items">
                <div className="app-item">
                  <h4>导电材料</h4>
                  <p>导电墨水和碳粉、纳米填料、聚合物粘合剂等</p>
                </div>
                <div className="app-item">
                  <h4>矿物原料</h4>
                  <p>硅、碳、石墨烯等矿物原料的纳米级制备</p>
                </div>
              </div>
            </div>

            <div className="app-category">
              <h3>营养保健品</h3>
              <div className="app-items">
                <div className="app-item">
                  <h4>保健产品</h4>
                  <p>维生素、代餐粉、口服维生素喷雾剂等的纳米级分散</p>
                </div>
                <div className="app-item">
                  <h4>纳米分散</h4>
                  <p>提高营养成分的生物利用度和吸收效率</p>
                </div>
              </div>
            </div>

            <div className="app-category">
              <h3>其它领域</h3>
              <div className="app-items">
                <div className="app-item">
                  <h4>食品加工</h4>
                  <p>豆奶等食品的纳米破碎处理，改善口感和营养价值</p>
                </div>
                <div className="app-item">
                  <h4>纳米分散和剥离</h4>
                  <p>各类材料的纳米级分散和剥离处理</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Applications */}
        <section className="content-section">
          <div className="section-header">
            <h2>专业应用领域</h2>
            <div className="section-line"></div>
          </div>

          <div className="validation-content">
            <div className="validation-item">
              <h3>中草药萃取技术应用</h3>
              <p>通过均质机对药材进行均质处理，可制成更细腻的粉末，达到微纳米级别，更易于人体吸收。并且在生产过程中温度可控，可提高药材的效果与效率。</p>
              <div className="content-grid">
                <div className="content-block">
                  <h4>膏剂处理</h4>
                  <p>使药材成分更均匀地分散在膏剂中，提高药物的稳定性和吸收性，改善膏剂的质地和使用体验。</p>
                </div>
                <div className="content-block">
                  <h4>粉剂制备</h4>
                  <p>制成更细腻的粉末，达到微纳米级别，更易于人体吸收，生产过程中温度可控。</p>
                </div>
                <div className="content-block">
                  <h4>汤剂优化</h4>
                  <p>将药材转变为纳米级颗粒，显著提高药材营养成分的溶解度和释放速度，使药效更快更好地发挥。</p>
                </div>
                <div className="content-block">
                  <h4>颗粒、丸、片剂</h4>
                  <p>使药材成分更加细腻易吸收，药材可以100%利用，有效成份均匀分布，提高制剂的质量和效果。</p>
                </div>
              </div>
            </div>

            <div className="validation-item">
              <h3>油脂分散行业应用</h3>
              <p>纳米破碎技术可以使油脂颗粒细化至纳米级，在食品、化妆品、工业应用等领域发挥重要作用。</p>
              <div className="content-grid">
                <div className="content-block">
                  <h4>食品行业</h4>
                  <p>制作沙拉酱、蛋黄酱、奶油等乳化食品时，增加乳液的稳定性，防止分离。</p>
                </div>
                <div className="content-block">
                  <h4>化妆品行业</h4>
                  <p>确保油脂和水相充分混合，形成细腻、均匀的乳化结构，提升产品质感和皮肤吸收性。</p>
                </div>
                <div className="content-block">
                  <h4>防晒产品</h4>
                  <p>帮助均匀分散油脂和活性成分，提高产品的防晒效果和肤感。</p>
                </div>
                <div className="content-block">
                  <h4>工业应用</h4>
                  <p>润滑油和润滑剂中分散添加剂，如抗氧化剂和极压添加剂，以增强润滑性能。</p>
                </div>
              </div>
            </div>

            <div className="validation-item">
              <h3>墨水行业应用</h3>
              <p>纳米破碎技术在墨水行业，尤其是喷墨墨水的生产中，发挥了重要作用，利用极端压力来细化物料，提高分散度。</p>
              <div className="content-grid">
                <div className="content-block">
                  <h4>颜料分散</h4>
                  <p>将颜料分散成纳米级大小，确保喷墨打印头的顺畅运行和打印质量，减少团聚。</p>
                </div>
                <div className="content-block">
                  <h4>提高稳定性</h4>
                  <p>形成更加均匀的悬浮液，减少颜料沉降的可能性，提高墨水的长期稳定性。</p>
                </div>
                <div className="content-block">
                  <h4>优化色彩表现</h4>
                  <p>更好的分散性意味着颜色更加饱和，色彩再现更加准确，实现高质量的打印输出。</p>
                </div>
                <div className="content-block">
                  <h4>环保优势</h4>
                  <p>清洁的生产方式，不需要使用溶剂或其它化学物质来辅助分散过程，减少环境污染。</p>
                </div>
              </div>
            </div>

            <div className="validation-item">
              <h3>生物制药行业应用</h3>
              <p>在生物制药领域，纳米破碎技术为细胞破碎、脂质体制备、生物制剂均质等提供了高效解决方案。</p>
              <div className="content-grid">
                <div className="content-block">
                  <h4>细胞破碎</h4>
                  <p>破碎各种类型的细胞，包括细菌、酵母、哺乳动物细胞等，释放细胞内的蛋白质、核酸、酶等生物活性物质。</p>
                </div>
                <div className="content-block">
                  <h4>脂质体制备</h4>
                  <p>缩小脂质体的尺寸，提高其均匀性，改善药物的装载效率和递送效果。</p>
                </div>
                <div className="content-block">
                  <h4>生物制剂均质</h4>
                  <p>均质化含有生物活性成分的溶液，如疫苗、抗体和酶制剂等，确保成分的均匀分布。</p>
                </div>
                <div className="content-block">
                  <h4>微乳液制备</h4>
                  <p>制备粒径小且分布均匀的微乳液和纳米乳液，提高药物的稳定性或控制释放。</p>
                </div>
              </div>
              <div className="test-charts">
                <img src="/images/hph-tech/biotech-application.png" alt="生物制药应用效果图" />
              </div>
            </div>

            <div className="validation-item">
              <h3>果汁、全茶饮、咖啡奶应用</h3>
              <p>纳米破碎技术在饮品行业的应用，显著改善产品口感、稳定性和营养价值。</p>
              <div className="content-grid">
                <div className="content-block">
                  <h4>果汁改善</h4>
                  <p>改善口感与稳定性，细化果汁中的固体颗粒，防止颗粒沉降，达到更均匀的色泽和透明度。</p>
                </div>
                <div className="content-block">
                  <h4>全茶饮</h4>
                  <p>茶叶的细化处理，使得茶叶可100%利用，并口感顺滑，色泽透明无悬浮物，提升溶解度。</p>
                </div>
                <div className="content-block">
                  <h4>咖啡奶</h4>
                  <p>提升稳定性，稳定乳液，防止牛奶和咖啡分离。同时可对咖啡豆进行全破碎。</p>
                </div>
                <div className="content-block">
                  <h4>口感改进</h4>
                  <p>通过细化牛奶中的脂肪球，创造更顺滑和丰富的口感。</p>
                </div>
              </div>
            </div>

            <div className="validation-item">
              <h3>硅、碳、石墨烯等矿物原料应用</h3>
              <p>纳米破碎技术在新材料制备领域的应用，为高端材料提供纳米级制备解决方案。</p>
              <div className="content-grid">
                <div className="content-block">
                  <h4>纳米硅粉</h4>
                  <p>常用于锂离子电池的阳极材料，太阳能电池板以及半导体行业。</p>
                </div>
                <div className="content-block">
                  <h4>纳米石墨烯粉末</h4>
                  <p>石墨烯因其高强度、高导电性和高热导率，在复合材料、导电油墨、储能设备和传感器等领域有广泛应用。</p>
                </div>
                <div className="content-block">
                  <h4>纳米碳粉</h4>
                  <p>包括导电油墨、碳纤维复合材料、催化剂载体和生物医学应用。</p>
                </div>
                <div className="content-block">
                  <h4>纳米白炭黑(SiO2)</h4>
                  <p>在橡胶工业中作为补强剂；在涂料和密封剂中作为增稠剂和触变剂；在化妆品中作为增稠剂和吸附剂。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Equipment Showcase */}
        <section className="content-section">
          <div className="section-header">
            <h2>纳米破碎机HPH设备</h2>
            <div className="section-line"></div>
          </div>

          <div className="solution-content">
            <div className="solution-highlight">
              <h3>增压式超高压纳米粉碎机(HPH)</h3>
              <p>压力稳定，均质细腻。能够将物料均质到纳米级甚至更小的粒径，使产品更加细腻、均匀。</p>
            </div>

            <div className="advantages-grid">
              <div className="advantage-item">
                <h4>可靠均质</h4>
                <p>能够将物料均质到纳米级甚至更小的粒径，使产品更加细腻、均匀。</p>
              </div>

              <div className="advantage-item">
                <h4>压力稳定</h4>
                <p>采用先进的增压技术，确保压力稳定，均质效果一致。最高压力：300Mpa/400Mpa。</p>
              </div>

              <div className="advantage-item">
                <h4>精准控制</h4>
                <p>可根据需求精确调节压力和流量，最大流量：0.1~9L/min。</p>
              </div>
            </div>

            <div className="test-charts">
              <img src="/images/hph-tech/equipment-showcase.png" alt="HPH设备展示" />
            </div>
          </div>
        </section>

        {/* Effect Validation */}
        <section className="content-section">
          <div className="section-header">
            <h2>纳米破碎效果验证</h2>
            <div className="section-line"></div>
          </div>

          <div className="validation-content">
            <div className="validation-item">
              <h3>淀粉纳米破碎效果对比</h3>
              <p>通过多次循环破碎实验，展示了纳米破碎技术对淀粉颗粒的显著改善效果。随着破碎次数的增加，淀粉浆由溶胶转变为凝胶，归因于淀粉颗粒的尺寸减小。</p>
              <div className="test-charts">
                <img src="/images/hph-tech/starch-process.png" alt="淀粉破碎过程" />
              </div>
            </div>

            <div className="validation-item">
              <h3>壳聚糖纳米纤维制备</h3>
              <p>采用高压破碎技术将壳聚糖颗粒分散在水中，获得的纳米纤维长度约为50nm，由直径为1-5nm的小束纳米原纤维组成。</p>
              <div className="test-charts">
                <img src="/images/hph-tech/chitosan-original.png" alt="壳聚糖纳米纤维制备" />
              </div>
            </div>

            <div className="validation-item">
              <h3>豆奶纳米破碎对比</h3>
              <p>纳米破碎后的豆奶与普通豆奶相比，在稳定性、口感和营养价值方面都有显著改善。</p>
              <div className="test-charts">
                <img src="/images/hph-tech/soymilk-comparison.png" alt="豆奶纳米破碎对比" />
              </div>
            </div>
          </div>
        </section>

        {/* Company Profile */}
        <section className="content-section company-section">
          <div className="section-header">
            <h2>关于大地水刀</h2>
            <div className="section-line"></div>
          </div>

          <div className="company-content">
            <div className="company-stats">
              <div className="stat-item">
                <span className="stat-number">1996</span>
                <span className="stat-label">创立年份</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">11000+</span>
                <span className="stat-label">全球用户</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">60+</span>
                <span className="stat-label">销售国家和地区</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">相关专利</span>
              </div>
            </div>

            <div className="company-description">
              <p>南京大地水刀股份有限公司，创建于1996年，是中国超高压水射流应用技术先行者，位居全球前列，是专业从事超高压水射流技术应用产品研发、生产、销售及技术服务的国家高新技术企业。</p>
              <p>大地凝聚近三十年研发、生产的经验和积累以及超10000家用户的使用经验沉淀，以超高压水射流技术应用推广为己任，不断完善研发创新机制、推陈出新，拥有与超高压水切割、水清洗相关的专利百余项。</p>
              <p>大地产品不仅覆盖全国，且远销欧洲、北美、南美、东南亚、中东等六十多个国家和地区，在电力及新能源、石化、高铁、汽车、医疗、纺织、食品、化工等广阔领域使用。</p>
            </div>
          </div>

          <div className="validation-content">
            <div className="validation-item">
              <h3>发展历程</h3>
              <div className="content-grid">
                <div className="content-block">
                  <h4>1996年</h4>
                  <p>大地水刀公司成立，研制成功国内首台水刀</p>
                </div>
                <div className="content-block">
                  <h4>1999年</h4>
                  <p>建立超高压实验室，编撰水切割行业标准，产品出口欧洲</p>
                </div>
                <div className="content-block">
                  <h4>2003年</h4>
                  <p>中国第一台机器人水刀诞生，研发60K超高压系统</p>
                </div>
                <div className="content-block">
                  <h4>2007年</h4>
                  <p>五轴水刀研发成功，水刀加工中心研发成果</p>
                </div>
                <div className="content-block">
                  <h4>2019年</h4>
                  <p>成功研制超高压均质机，多款五轴成功推向市场</p>
                </div>
                <div className="content-block">
                  <h4>2022年</h4>
                  <p>大地水刀被评为江苏省专精特新中小企业</p>
                </div>
              </div>
            </div>

            <div className="validation-item">
              <h3>全球营销网络</h3>
              <p>大地水刀产品远销全球60多个国家和地区，拥有完善的全球营销网络和技术服务体系。</p>
              <div className="test-charts">
                <img src="/images/hph-tech/global-network.png" alt="全球营销网络图" />
              </div>
            </div>
          </div>

          <div className="company-footer">
            <p>联系我们，体验纳米破碎技术的强大力量</p>
            <span className="company-lab">大地超高压技术创新实验室</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HPHDetailPage;