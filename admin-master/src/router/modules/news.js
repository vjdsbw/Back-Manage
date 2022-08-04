const Layout = () => import('@/layout/index.vue')
export default [
  {
    path: '/news',
    component: Layout,
    redirect: '/news/index',
    name: 'news',
    meta: {
      title: '新闻模块',
    },
    icon: 'user',
    children: [
      {
        path: 'list',
        component: () => import('@/views/news/list.vue'),
        name: 'newslist',
        meta: { title: '新闻列表' },
        icon: 'eye',
      },
      {
        path: 'create',
        component: () => import('@/views/news/create.vue'),
        name: 'createnews',
        meta: { title: '新增新闻' },
        icon: 'form',
      },
    ],
  },
]
