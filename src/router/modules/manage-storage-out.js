import Layout from '@/layout'
export default {
  path: '/manage-storage-out',
  component: Layout,
  name: 'manage-storage-out',
  redirect: '/manage-storage-out/list-out',
  meta: { title: '出货管理', icon: 'dashboard' },
  children: [
    {
      path: 'list-out',
      name: 'list-out',
      component: () => import('@/views/ManageStorageOut/ListOutList'),
      meta: { title: '出库单', icon: 'dashboard' }

    },
    {
      path: '/manage-storage-out/list-out/details/:id',
      name: '/details/null',
      hidden: true,
      component: () => import('@/views/ManageStorageOut/ListOutList/components/details.vue'),
      meta: { title: '新增出库单' }

    },
    {
      path: 'task-picking',
      name: 'list-out-task-picking',
      component: () => import('@/views/ManageStorageOut/TaskPicking'),
      meta: { title: '拣货任务', icon: 'dashboard' }
    },
    {
      path: 'sure/:id',
      name: 'sure',
      hidden: true,
      component: () => import('@/views/ManageStorageOut/TaskPicking/components/sure.vue'),
      meta: { title: '拣货详情' }
    },
    {
      path: 'list-detail/:id',
      name: 'list-detail',
      hidden: true,
      component: () => import('@/views/ManageStorageOut/ListOutList/components/listDetai.vue'),
      meta: { title: '查看出库单详情' }
    },
    {
      path: 'manage-task-transfer',
      name: 'manage-task-transfer',
      component: () => import('@/views/ManageStorageOut/ManageTaskTransfer'),
      meta: { title: '交接任务', icon: 'dashboard' }

    }
  ]
}
