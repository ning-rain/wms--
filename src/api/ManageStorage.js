import { serviceApi, serviceIps } from '@/utils/request'

// 分页查询明细库存
export function stockPageDetail(params) {
  return serviceIps({
    url: '/stock/pageDetail',
    params
  })
}
// 查询全部仓库
export function warehouseList(params) {
  return serviceApi({
    url: 'warehouse/list',
    params
  })
}
// 查询全部库区
export function getAreaList(params) {
  return serviceApi({
    url: 'area/list',
    params
  })
}
// 查询全部库位
export function getLocationlist(params) {
  return serviceApi({
    url: 'location/list',
    params
  })
}
// 分页查询明细库存
export function getStockPageDetail(params) {
  return serviceIps({
    url: '/stock/pageDetail',
    method: 'GET',
    params
  })
}
// 分页查询库存记录
export function getStockRecordPage(params) {
  return serviceIps({
    url: 'stockRecord/page',
    params
  })
}
export function getCheckList(params) {
  return serviceIps({
    url: 'check/pageDetail',
    method: 'GET',
    params
  })
}

// 获取全部货主
export function getOwnerList() {
  return serviceApi({
    url: 'owner/list'
  })
}

// 获取盘点仓库
export function getWarehouseList(params) {
  return serviceApi({
    url: 'warehouse/list',
    params
  })
}

// 获取盘点仓库下的库区
export function getWarehouseAreaList(params) {
  return serviceApi({
    url: 'area/list',
    params
  })
}

// 获取下一个编码
export function getNextCodeFactory(name) {
  return serviceApi({
    url: `codeFactory/next/${name}`
  })
}

// 新增盘点单
export function addCheck(data) {
  return serviceIps({
    url: 'check',
    method: 'POST',
    data
  })
}

// 取消盘点单
export function cancelCheck(data) {
  return serviceIps({
    url: 'check/cancel',
    method: 'PUT',
    data
  })
}

// 生成盘点任务
export function createCheckTask(data) {
  return serviceIps({
    url: 'check/task',
    method: 'POST',
    data
  })
}

// 获取盘点详情
export function getCheckInfo(id, params) {
  return serviceIps({
    url: `check/detail/${id}`,
    params
  })
}

// 获取盘点清单
export function getCheckListList(params) {
  return serviceIps({
    url: 'checkList/pageDetail',
    params
  })
}

// 获取库存
export function getStock(params) {
  return serviceIps({
    url: 'stock/pageDetail',
    params
  })
}

//! 盘点任务

// 分页查询盘点任务明细
export function getCheckTaskList(params) {
  return serviceIps({
    url: 'checkTask/pageDetail',
    params
  })
}

// 分配盘点任务
export function distributeCheckTask(data) {
  return serviceIps({
    url: 'checkTask/distribute',
    method: 'PUT',
    data
  })
}

// 查询全部盘点任务
export function getAllCheckTask(params) {
  return serviceIps({
    url: 'checkTask/list',
    params
  })
}

// 盘点完成
export function checkTaskComplete(data) {
  return serviceIps({
    url: 'checkTask/complete',
    method: 'PUT',
    data
  })
}

// 生成损益单
export function increaseDecrease(data) {
  return serviceIps({
    url: 'checkTask/increaseDecrease',
    method: 'POST',
    data
  })
}

// 生成复盘
export function createTask(data) {
  return serviceIps({
    url: 'checkTask/task',
    method: 'POST',
    data
  })
}

// 损益单明细
export function increaseDecreaseInfo(params) {
  return serviceIps({
    url: 'increaseDecrease/pageDetail',
    params
  })
}
