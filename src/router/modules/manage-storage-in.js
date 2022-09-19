import Layout from '@/layout'
export default {
  path: '/manage-storage-in',
  component: Layout,
  name: 'manage-storage-in',
  redirect: '/manage-storage-in/list-in/list',
  meta: { title: '入库管理', icon: 'dashboard' },
  children: [{
    path: '/list-in/list',
    name: 'list-in-list',
    component: () => import('@/views/ManageStorageIn/ListInList'),
    meta: { title: '入库单', icon: 'dashboard' }
  },
  // 新增入库单
  {
    path: '/manage-storage-in/list-in/list/details/:id',
    component: () => import('@/views/ManageStorageIn/ListInList/components/RKDH.vue')
  },

  // 查看详情
  {
    path: '/manage-storage-in/list-in/list/list-detail/:id',
    name: 'list-detail',
    component: () => import('@/views/ManageStorageIn/ListInList/components/viewDetails-s.vue'),
    hidden: true
  },
  {
    path: '/list-in/task-receive',
    name: 'task-receive',
    component: () => import('@/views/ManageStorageIn/TaskReceive'),
    meta: { title: '收货任务', icon: 'dashboard' }

  }, {
    path: '/list-in/task-add',
    name: 'task-add',
    component: () => import('@/views/ManageStorageIn/TaskAdd'),
    meta: { title: '上架任务', icon: 'dashboard' }
  },
  {
    path: '/manage-storage-in/list-in/task-add/sure/:id/detail',
    name: 'task-detail',
    component: () => import('@/views/ManageStorageIn/taskDetail'),
    meta: { title: '上架详情', icon: 'dashboard' },
    hidden: true
  },
  // 收货任务的查看详情
  {
    path: '/manage-storage-in/list-in/task-receive/sure/:id/detail',
    component: () => import('@/views/ManageStorageIn/TaskReceive/components/index.vue'),
    meta: { title: '任务详情', icon: 'dashboard' },
    hidden: true
  }
  ]
}
