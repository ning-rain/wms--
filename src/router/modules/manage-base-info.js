import Layout from '@/layout'
export default {
  path: '/manage-base-info',
  component: Layout,
  name: 'manage-base-info',
  redirect: '/manage-base-info/warehouse',
  meta: { title: '基础信息管理', icon: 'dashboard' },
  children: [{
    path: 'warehouse',
    name: 'warehouse',
    component: () => import('@/views/ManageBaseInfo/Warehouse'),
    meta: { title: '仓库管理', icon: 'dashboard' }
  }, {
    path: 'area',
    name: 'area',
    component: () => import('@/views/ManageBaseInfo/Area'),
    meta: { title: '库区管理', icon: 'dashboard' }

  }, {
    path: 'location',
    name: 'location',
    component: () => import('@/views/ManageBaseInfo/Location'),
    meta: { title: '库位管理', icon: 'dashboard' }
  }, {
    path: 'location/detail/:id',
    name: 'AddLocation',
    meta: { title: '新增库位', icon: 'dashboard' },
    component: () => import('@/views/ManageBaseInfo/AddLocation'),
    hidden: true
  }, {
    path: 'location-view',
    name: 'location-view',
    component: () => import('@/views/ManageBaseInfo/locationView'),
    meta: { title: '库位视图', icon: 'dashboard' }

  }, {
    path: 'goods',
    name: 'goods',
    component: () => import('@/views/ManageBaseInfo/Goods'),
    meta: { title: '货品管理', icon: 'dashboard' }
  }, {
    path: '/manage-base-info/warehouse/details/:id',
    name: '/details/null',
    component: () => import('@/views/ManageBusiness/GoodsOwner/components/addShipper.vue'),
    meta: { title: '新增货主' },
    hidden: true
  }, {
    path: '/manage-base-info/warehouse/detailss/:id',
    name: '/details/nulls',
    component: () => import('@/views/ManageBaseInfo/Goods/components/addGoods.vue'),
    meta: { title: '新增货品' },
    hidden: true
  }, {
    path: 'goods-type',
    name: 'goods-type',
    component: () => import('@/views/ManageBaseInfo/GoodStype'),
    meta: { title: '货品类型管理', icon: 'dashboard' }

  }, {
    path: '/manage-base-info/warehouse/details/:id',
    name: '/details/null',
    component: () => import('@/views/ManageBaseInfo/Warehouse/components/AddWarehouse.vue'),
    meta: { title: '新增仓库' },
    hidden: true
  }, {
    path: '/manage-base-info/area/details/:id',
    name: 'areaDialog',
    component: () => import('@/views/ManageBaseInfo/Area/components/AddArea.vue'),
    meta: { title: '新增库区' },
    hidden: true
  }]
}
