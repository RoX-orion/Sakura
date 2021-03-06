import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/post',
    component: Layout,
    meta: { title: '文章管理', icon: 'post' },
    children: [
      {
        path: 'all-post',
        name: 'AllPost',
        component: () => import('@/views/post/all-post'),
        meta: { title: '所有文章' }
      },
      {
        path: 'add-post',
        name: 'AddPost',
        component: () => import('@/views/post/add-post'),
        meta: { title: '写文章' }
      },
      {
        path: 'term',
        name: 'Term',
        component: () => import('@/views/post/term'),
        meta: { title: '分类目录' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system',
    meta: { title: '系统', icon: 'system' },
    alwaysShow: true,
    children: [
      {
        path: 'index',
        name: 'performance',
        component: () => import('@/views/system/performance'),
        meta: {title: '性能监控'}
      },
      {
        path: 'env',
        name: 'Env',
        component: () => import('@/views/system/env'),
        meta: { title: '环境信息' }
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('@/views/system/setting'),
        meta: { title: '设置' }
      }
    ]
  },

  {
    path: '/test',
    component: Layout,
    redirect: 'test',
    children: [{
      path: 'test',
      name: 'Test',
      component: () => import('@/views/test/index'),
      meta: { title: '测试页', icon: 'example' }
    }]
  },

  {
    path: '/file',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'file',
      name: 'File',
      component: () => import('@/views/file/index'),
      meta: { title: '文件管理', icon: 'file' }
    }]
  },

  {
    path: '/components',
    component: Layout,
    redirect: '/components',
    meta: { title: '组件', icon: 'component'},
    children: [
      {
        path: 'tinymce',
        name: 'Tinymce',
        component: () => import('@/views/components/tinymce'),
        meta: { title: '富文本编辑器' }
      },
      {
        path: 'mavon-editor',
        name: 'MavonEditor',
        component: () => import('@/views/components/mavon-editor'),
        meta: { title: 'MarkDown编辑器' }
      },
      {
        path: 'card',
        name: 'Card',
        component: () => import('@/views/components/card'),
        meta: { title: '卡片'}
      },
      {
        path: 'bilibili',
        name: 'Bilibili',
        component: () => import('@/views/components/bilibili'),
        meta: {title: 'Bilibili播放器'}
      }
    ]
  },

  {
    path: '/user-manage',
    component: Layout,
    redirect: '/user-manage',
    meta: { title: '用户管理', icon: 'user-manage'},
    alwaysShow: true,
    children: [
      {
        path: 'login-history',
        name: 'LoginHistory',
        component: () => import('@/views/user-manage/login-history/index'),
        meta: { title: '登录记录' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '表单', icon: 'form' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile',
    children: [{
      path: 'index',
      name: 'Profile',
      component: () => import('@/views/profile/index'),
      meta: { title: '个人中心', icon: 'user'}
    }]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
