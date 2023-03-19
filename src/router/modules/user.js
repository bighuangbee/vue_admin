const Layout = () => import('@/layout/index.vue')
const UserList = () => import('@/views/user/index.vue')
const UserAdd = () => import('@/views/user/Add.vue')

export default [
  {
    path: '/user',
    component: Layout,
    name: 'users',
    meta: {
      title: '用户管理',
    },
    icon: 'user',
    children: [
      {
        path: 'list',
        name: 'userList',
        component: UserList,
        meta: {
          title: '用户管理',
        },
      },
      {
        path: 'add',
        name: 'userAdd',
        component: UserAdd,
        meta: {
          title: '添加用户',
        },
        hidden: true,
      },
      {
        path: 'edit/:id',
        name: 'userEdit',
        component: UserAdd,
        meta: {
          title: '编辑用户',
        },
        hidden: true,
      },
    ],
  },
]
