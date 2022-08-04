const Layout = () => import('@/layout/index.vue')
const productdetail = () => import('@/views/product/productdetail.vue')
const addproduct = () => import('@/views/product/addproduct.vue')
const index = () => import('@/views/product/index.vue')

export default [
  {
    path: '/product',
    component: Layout,
    name: 'product',
    meta: {
      title: '产品',
    },
    icon: 'el-icon-bangzhu',
    children: [
      {
        path: '',
        name: 'index',
        component: index,
        meta: {
          title: '产品列表',
        },
      },
      {
        path: 'addproduct',
        name: 'productdetail',
        component: addproduct,
        meta: {
          title: '新增产品',
        },
      },
      {
        path: 'productdetail/:id',
        name: 'addproduct',
        component: productdetail,
        meta: {
          title: '产品详情',
        },
        hidden: true,
      },
    ],
  },
]
