// 员工端
export default {
  // 盘点原因
  backReason: [
    { value: '规划', prop: 'GH', text: '规划' },
    { value: '货主', prop: 'HZ', text: '货主' },
    { value: '差异', prop: 'CY', text: '差异' }
  ],
  // 盘点维度
  backDimension: [
    { text: '库位', prop: 'KW', value: '库位' },
    { text: '货品', prop: 'HP', value: '货品' }
  ],
  // 盘点类型
  backType: [
    { text: '随机盘点', value: '随机盘点', prop: 'SJPD' },
    { text: '计划盘点', value: '计划盘点', prop: 'JHPD' }
  ]
}

