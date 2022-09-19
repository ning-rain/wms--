import { serviceApi, serviceIps } from '@/utils/request'

// 任务交接
export function getTransferList(params) {
  return serviceIps({
    url: 'handover/pageDetail',
    params
  })
}

// 出库单列表获取
export function getOutBoundList(params) {
  return serviceIps({
    url: 'outbound/pageDetail',
    params
  })
}

// 拣货任务明细
export function getPickingList(params) {
  return serviceIps({
    url: 'picking/pageDetail',
    params
  })
}

// 获取下一个编码
export function getCodeFactory(name) {
  return serviceApi({
    url: `codeFactory/next/${name}`
  })
}

// 查询全部仓库
export function getWareHouse(params) {
  return serviceApi({
    url: 'warehouse/list',
    params
  })
}

// 查询全部货主管理
export function getOwner(params) {
  return serviceApi({
    url: 'owner/list',
    params
  })
}

// 查询全部库区
export function getArea(params) {
  return serviceApi({
    url: 'area/list',
    params
  })
}

// 新增出库单接口
export function getAddOutbound(data) {
  return serviceIps({
    url: 'outbound',
    method: 'post',
    data
  })
}

// 添加发货商品
export function addGoods(params) {
  return serviceIps({
    url: 'stock/pageDetail',
    params
  })
}
// 分配人员
export function setRole(data) {
  return serviceApi({
    url: 'picking/distribute',
    method: 'PUT',
    data
  })
}

// 查询合计信息
export function searchSum(masterId) {
  return serviceIps({
    url: `outboundList/sum/${masterId}`
  })
}

// 分页查询出库清单明细
export function getOutBound(params) {
  return serviceIps({
    url: 'outboundList/pageDetail',
    params
  })
}

// 取消出库单
export function cancel(data) {
  return serviceIps({
    url: 'outbound/cancel',
    method: 'PUT',
    data
  })
}

// 查询出库单
export function checkOutbound(id) {
  return serviceIps({
    url: `outbound/${id}`
  })
}

// 查询详情
export function getDetails(id) {
  return serviceIps({
    url: `outbound/detail/${id}`
  })
}

// 生成波次
export function getPicking(data) {
  return serviceIps({
    url: 'outbound/picking',
    method: 'POST',
    data
  })
}

// 拣货完成
export function pickingOk(data) {
  return serviceIps({
    url: 'picking/complete',
    method: 'PUT',
    data
  })
}
