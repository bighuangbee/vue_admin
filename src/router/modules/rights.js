const Layout = () => import('@/layout/index.vue')
const RightsList = () => import('@/views/rights/index.vue')

export default [
  {
    path: '/rights',
    component: Layout,
    name: 'rights',
    meta: {
      title: '权限管理',
    },
    icon: 'rights',
    children: [
      {
        path: '',
        name: 'rightsList',
        component: RightsList,
        meta: {
          title: '权限管理',
        },
      },
    ],
  },
]
