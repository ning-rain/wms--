import { serviceIps } from '@/utils/request'

export const getHomeToDo = () => {
  return serviceIps({
    url: 'home/todo'
  })
}
export const getHomeSumList = (params) => {
  return serviceIps({
    url: 'home/sumList',
    params
  })
}
export const getHomeStockUseStatus = () => {
  return serviceIps({
    url: 'home/stockUseStatus'
  })
}

export const getAreaUseStatus = () => {
  return serviceIps({
    url: 'home/areaUseStatus'
  })
}
