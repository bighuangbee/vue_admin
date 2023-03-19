const Layout = () => import('@/layout/index.vue')
const ProductList = () => import('@/views/product/index.vue')
const TypesList = () => import('@/views/product/types.vue')

export default [
  {
    path: '/product',
    component: Layout,
    name: 'products',
    meta: {
      title: '商品管理',
    },
    icon: 'product',
    children: [
      {
        path: 'list',
        name: 'productList',
        component: ProductList,
        meta: {
          title: '商品列表',
        },
      },
      {
        path: 'types',
        name: 'typesList',
        component: TypesList,
        meta: {
          title: '分类列表',
        },
      },
    ],
  },
]
