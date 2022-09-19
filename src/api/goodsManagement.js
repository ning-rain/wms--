import { serviceApi, serviceIps } from '@/utils/request'

export function getGoods(params) {
  return serviceApi({
    url: '/goods/pageDetail',
    method: 'get',
    params
  })
}

export function delGoods(params) {
  return serviceApi({
    url: '/goods',
    method: 'DELETE',
    params
  })
}

export function getGoodsCode(HP) {
  return serviceApi({
    url: `/codeFactory/next/${HP}`,
    method: 'Get'
  })
}

export function goodsType() {
  return serviceApi({
    url: '/goodsType/vague',
    method: 'Get'
  })
}

export function goodsOwner(params) {
  return serviceApi({
    url: '/owner/vague',
    method: 'Get',
    params
  })
}

export function editGoods(id) {
  return serviceApi({
    url: `/goods/${id}`,
    method: 'GET'
  })
}

export function addGoods(data) {
  return serviceApi({
    url: '/goods',
    method: 'POST',
    data
  })
}

export function getAreaList(params) {
  return serviceApi({
    url: '/area/list',
    method: 'GET',
    params
  })
}
