// 技术分类数据配置

export interface TechCategory {
  id: number;
  title: string;
  bgColor: string;
  leftBgColor: string;
  rightBg: string;
  description: string;
  details: string;
}

// HPH 纳米破碎·动态灭菌技术分类
export const hphCategories: TechCategory[] = [
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

// PEF 超冰温·脉冲电场保鲜技术分类
export const pefCategories: TechCategory[] = [
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