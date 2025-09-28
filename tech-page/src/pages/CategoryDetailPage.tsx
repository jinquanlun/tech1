import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/CategoryDetailPage.css';

// Category data from TechShowcasePage
const CATEGORY_DATA = {
  hph: {
    'drinks-sauces': {
      name: '饮品与酱料',
      description: '革新液体产品的质地与口感',
      techName: 'HPH纳米破碎·动态灭菌',
      fullDescription: 'HPH高压均质技术在饮品与酱料领域的应用，通过纳米级破碎实现更细腻的口感和更均匀的质地分布。',
      benefits: [
        '提升产品口感和质地均匀性',
        '增强风味释放和营养吸收',
        '延长产品保质期',
        '减少添加剂使用'
      ],
      applications: ['果汁饮料', '调味酱料', '乳制品', '蛋白饮品'],
      specifications: {
        pressure: '200-300 MPa',
        temperature: '65-85°C',
        efficiency: '99.9%',
        capacity: '1000-5000 L/h'
      }
    },
    'healthcare-pharma': {
      name: '保健品与医药',
      description: '提升营养成分吸收效率',
      techName: 'HPH纳米破碎·动态灭菌',
      fullDescription: '在保健品与医药领域，HPH技术能够显著提高活性成分的生物利用度和稳定性。',
      benefits: [
        '提高生物利用度',
        '增强活性成分稳定性',
        '改善产品溶解性',
        '优化释放控制'
      ],
      applications: ['营养补充剂', '液体药物', '功能饮品', '维生素制剂'],
      specifications: {
        pressure: '150-250 MPa',
        temperature: '50-70°C',
        efficiency: '99.8%',
        capacity: '500-2000 L/h'
      }
    },
    'cosmetics': {
      name: '化妆品',
      description: '纳米级护肤成分渗透',
      techName: 'HPH纳米破碎·动态灭菌',
      fullDescription: '在化妆品行业，HPH技术实现护肤成分的纳米化，提升皮肤渗透效果。',
      benefits: [
        '增强皮肤渗透力',
        '提升产品稳定性',
        '改善使用质感',
        '延长有效期'
      ],
      applications: ['护肤精华', '防晒产品', '抗衰老产品', '保湿乳液'],
      specifications: {
        pressure: '100-200 MPa',
        temperature: '40-60°C',
        efficiency: '99.7%',
        capacity: '200-1000 L/h'
      }
    },
    'new-energy': {
      name: '新能源材料',
      description: '材料性能优化与改良',
      techName: 'HPH纳米破碎·动态灭菌',
      fullDescription: 'HPH技术在新能源材料加工中，提升材料的分散性和性能一致性。',
      benefits: [
        '提升材料分散性',
        '增强性能一致性',
        '优化导电特性',
        '改善加工性能'
      ],
      applications: ['锂电池材料', '太阳能材料', '燃料电池', '储能材料'],
      specifications: {
        pressure: '300-500 MPa',
        temperature: '25-50°C',
        efficiency: '99.9%',
        capacity: '100-500 L/h'
      }
    },
    'seasoning-soup': {
      name: '调味品与汤料',
      description: '浓郁风味快速提取',
      techName: 'HPH纳米破碎·动态灭菌',
      fullDescription: '通过HPH技术快速提取和浓缩调味品中的风味成分，提升产品品质。',
      benefits: [
        '增强风味浓度',
        '改善溶解性',
        '提升保质期',
        '减少加工时间'
      ],
      applications: ['浓缩汤料', '调味粉', '香精香料', '酱汁产品'],
      specifications: {
        pressure: '150-300 MPa',
        temperature: '60-80°C',
        efficiency: '99.8%',
        capacity: '800-3000 L/h'
      }
    },
    'biotech': {
      name: '生物科技',
      description: '细胞破壁与生物活性释放',
      techName: 'HPH纳米破碎·动态灭菌',
      fullDescription: 'HPH技术在生物科技领域实现高效细胞破壁，释放生物活性成分。',
      benefits: [
        '高效细胞破壁',
        '保持生物活性',
        '提高提取率',
        '缩短处理时间'
      ],
      applications: ['细胞培养', '蛋白提取', '酶制剂', '生物制药'],
      specifications: {
        pressure: '200-400 MPa',
        temperature: '30-55°C',
        efficiency: '99.9%',
        capacity: '200-1000 L/h'
      }
    }
  },
  pef: {
    'premium-meat': {
      name: '高端生鲜肉禽',
      description: '保持肉质鲜美与营养',
      techName: 'PEF超冰温·脉冲电场保鲜',
      fullDescription: 'PEF脉冲电场技术在高端生鲜肉禽保鲜中，维持肉质新鲜度和营养价值。',
      benefits: [
        '保持肉质新鲜',
        '延长保质期',
        '维持营养成分',
        '改善肉质嫩度'
      ],
      applications: ['优质牛肉', '有机鸡肉', '海鲜产品', '羊肉制品'],
      specifications: {
        voltage: '20-40 kV/cm',
        temperature: '-1 to 2°C',
        preservation: '14-21 days',
        efficiency: '99.5%'
      }
    },
    'prepared-foods': {
      name: '预制菜与即食产品',
      description: '延长保鲜期保持口感',
      techName: 'PEF超冰温·脉冲电场保鲜',
      fullDescription: 'PEF技术为预制菜品提供优质保鲜解决方案，保持原有风味和口感。',
      benefits: [
        '延长保质期',
        '保持原味口感',
        '减少营养流失',
        '提升产品安全'
      ],
      applications: ['速冻水饺', '即食米饭', '预制汤品', '半成品菜'],
      specifications: {
        voltage: '15-30 kV/cm',
        temperature: '-2 to 4°C',
        preservation: '7-14 days',
        efficiency: '99.3%'
      }
    },
    'fruits-vegetables': {
      name: '精品水果与蔬菜',
      description: '锁住新鲜与营养成分',
      techName: 'PEF超冰温·脉冲电场保鲜',
      fullDescription: 'PEF技术保持精品果蔬的新鲜度，最大化保留维生素和矿物质。',
      benefits: [
        '保持新鲜外观',
        '锁住营养成分',
        '延长货架期',
        '减少腐败损失'
      ],
      applications: ['有机蔬菜', '进口水果', '切割果蔬', '沙拉产品'],
      specifications: {
        voltage: '10-25 kV/cm',
        temperature: '0 to 4°C',
        preservation: '5-10 days',
        efficiency: '99.1%'
      }
    },
    'dairy-eggs': {
      name: '乳制品与蛋类',
      description: '维持原始风味与质地',
      techName: 'PEF超冰温·脉冲电场保鲜',
      fullDescription: 'PEF技术确保乳制品和蛋类产品的新鲜度，保持原有的营养和口感。',
      benefits: [
        '保持原始风味',
        '维持产品质地',
        '延长保质期',
        '减少微生物污染'
      ],
      applications: ['鲜牛奶', '酸奶制品', '新鲜鸡蛋', '奶酪产品'],
      specifications: {
        voltage: '12-28 kV/cm',
        temperature: '2 to 6°C',
        preservation: '7-14 days',
        efficiency: '99.4%'
      }
    },
    'flowers-herbs': {
      name: '花卉与药用植物',
      description: '保持活性成分与形态',
      techName: 'PEF超冰温·脉冲电场保鲜',
      fullDescription: 'PEF技术维持花卉和药用植物的活性成分，保持形态完整性。',
      benefits: [
        '保持植物活性',
        '维持形态完整',
        '延长观赏期',
        '保存药用价值'
      ],
      applications: ['鲜切花卉', '药用草本', '芳香植物', '观赏绿植'],
      specifications: {
        voltage: '8-20 kV/cm',
        temperature: '2 to 8°C',
        preservation: '3-7 days',
        efficiency: '98.8%'
      }
    },
    'pharma-cold-chain': {
      name: '医药冷链',
      description: '确保药品稳定性与效力',
      techName: 'PEF超冰温·脉冲电场保鲜',
      fullDescription: 'PEF技术为医药冷链提供精确的温控和保鲜方案，确保药品质量。',
      benefits: [
        '维持药品效力',
        '确保质量稳定',
        '精确温度控制',
        '延长有效期'
      ],
      applications: ['疫苗储存', '生物制剂', '血液制品', '胰岛素'],
      specifications: {
        voltage: '5-15 kV/cm',
        temperature: '-20 to 8°C',
        preservation: '30-180 days',
        efficiency: '99.9%'
      }
    },
    'beverages-alcohol': {
      name: '饮料与酒类',
      description: '保鲜技术提升品质',
      techName: 'PEF超冰温·脉冲电场保鲜',
      fullDescription: 'PEF技术提升饮料和酒类产品的品质稳定性，保持原有风味特色。',
      benefits: [
        '保持风味稳定',
        '防止氧化变质',
        '延长保质期',
        '提升产品品质'
      ],
      applications: ['精酿啤酒', '果汁饮料', '葡萄酒', '功能饮品'],
      specifications: {
        voltage: '10-25 kV/cm',
        temperature: '4 to 12°C',
        preservation: '14-30 days',
        efficiency: '99.2%'
      }
    }
  }
};

const CategoryDetailPage: React.FC = () => {
  const { techType, categoryId } = useParams<{ techType: string; categoryId: string }>();
  const navigate = useNavigate();

  // Get category data
  const categoryData = techType && categoryId ? CATEGORY_DATA[techType as 'hph' | 'pef']?.[categoryId] : null;

  if (!categoryData) {
    return (
      <div className="category-detail-page error">
        <h1>页面未找到</h1>
        <p>请检查URL或返回技术展示页面</p>
        <button onClick={() => navigate('/tech')}>返回技术展示</button>
      </div>
    );
  }

  return (
    <div className="category-detail-page">
      {/* Header */}
      <header className="detail-header">
        <button className="back-button" onClick={() => navigate('/tech')}>
          ← 返回技术展示
        </button>
        <div className="tech-badge">{categoryData.techName}</div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="category-title">{categoryData.name}</h1>
          <p className="category-subtitle">{categoryData.description}</p>
          <div className="category-overview">
            <p>{categoryData.fullDescription}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="content-sections">
        {/* Benefits Section */}
        <section className="benefits-section">
          <h2>技术优势</h2>
          <div className="benefits-grid">
            {categoryData.benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">✓</div>
                <p>{benefit}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Applications Section */}
        <section className="applications-section">
          <h2>应用领域</h2>
          <div className="applications-grid">
            {categoryData.applications.map((application, index) => (
              <div key={index} className="application-card">
                <span>{application}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Specifications Section */}
        <section className="specifications-section">
          <h2>技术规格</h2>
          <div className="specifications-grid">
            {Object.entries(categoryData.specifications).map(([key, value]) => (
              <div key={key} className="spec-item">
                <span className="spec-label">
                  {key === 'pressure' && '压力范围'}
                  {key === 'voltage' && '电压强度'}
                  {key === 'temperature' && '温度范围'}
                  {key === 'efficiency' && '处理效率'}
                  {key === 'capacity' && '处理能力'}
                  {key === 'preservation' && '保鲜期限'}
                </span>
                <span className="spec-value">{value}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h3>了解更多技术详情</h3>
          <p>我们的专业团队随时为您提供技术咨询和解决方案</p>
          <div className="cta-buttons">
            <button className="primary-btn">联系我们</button>
            <button className="secondary-btn" onClick={() => navigate('/tech')}>
              查看其他技术
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryDetailPage;