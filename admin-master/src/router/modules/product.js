
// login.js
const Layout = () => import('@/layout/index.vue')
const Product = () => import('@/views/product/index.vue')

export default [
  {
    path: '/home',
    component: Layout,
    name: 'Dashboard',
    meta: {
      title: '产品',
    },
    icon: 'home',
    children: [
      {
        path: '',
        name: 'product',
        component: Product,
        meta: {
          title: '产品详情',
          affix: true,
        },
      },
    ],
  },
]
