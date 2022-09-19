import { serviceApi, serviceIps } from '@/utils/request'

export function getCarriers(params) {
  return serviceApi({
    url: '/carrier/page',
    method: 'get',
    params
  })
}
