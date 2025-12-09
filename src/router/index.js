import { createRouter, createWebHistory } from 'vue-router'
import AppBasis from '@/layout/AppBasis.vue'


// 这里统一导入菜单用到的图标
import { LayoutDashboard, BarChart3, Users, Settings, FileText } from 'lucide-vue-next'


export default function setupRouter() {
    const routes = [
        {
            path: '/',
            component: AppBasis,
            children: [
                {
                    path: '',
                    redirect: '/dashboard',
                },
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: () => import('@/pages/dashboard/index.vue'),
                    meta: {
                        title: '仪表盘',
                        group: '概览',
                        icon: LayoutDashboard,        // ✅ 直接放组件
                        requiresAuth: true,
                        hidden: false,
                        roles: ['admin', 'operator'],
                    },
                },
                {
                    path: 'reports',
                    name: 'reports',
                    component: () => import('@/pages/reports/index.vue'),
                    meta: {
                        title: '报表中心',
                        group: '概览',
                        icon: BarChart3,             // ✅
                        requiresAuth: true,
                        hidden: false,
                        roles: ['admin', 'operator'],
                    },
                },
                {
                    path: 'users',
                    name: 'users',
                    component: () => import('@/pages/users/index.vue'),
                    meta: {
                        title: '用户管理',
                        group: '系统',
                        icon: Users,                 // ✅
                        requiresAuth: true,
                        hidden: false,
                        roles: ['admin', 'operator'],
                    },
                },
                {
                    path: 'settings',
                    name: 'settings',
                    component: () => import('@/pages/settings/index.vue'),
                    meta: {
                        title: '系统设置',
                        group: '系统',
                        icon: Settings,              // ✅
                        requiresAuth: true,
                        hidden: false,
                        roles: ['admin', 'operator'],
                    },
                },
                {
                    path: 'hidden-demo',
                    name: 'hidden-demo',
                    component: () => import('@/pages/hidden-demo/index.vue'),
                    meta: {
                        title: '隐藏路由示例',
                        group: '系统',
                        icon: FileText,              // ✅
                        requiresAuth: true,
                        hidden: true, // 侧边栏不显示
                        roles: ['admin', 'operator'],
                    },
                },

            ],
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/pages/login/LoginApp.vue'),
            meta: {
                title: '登录',
                group: 'Login',
                icon: Settings,              // 看你爱用哪个占位都行
                requiresAuth: false,
                hidden: true,
                roles: [],
            },
        },
        // 404 兜底
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: {
                template: `
          <div class="min-h-screen flex items-center justify-center text-center">
            <div>
              <p class="text-4xl font-bold mb-2">404</p>
              <p class="text-gray-500 mb-4">Page not found</p>
              <a href="/dashboard" class="text-blue-500 hover:underline">Back to Dashboard</a>
            </div>
          </div>
        `,
            },
            meta: {
                title: '404 Not Found',
                requiresAuth: false,
            },
        },
    ]

    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes,
        scrollBehavior() {
            return { top: 0 }
        },
    })

    router.afterEach((to) => {
        if (to.meta && to.meta.title) {
            document.title = `${to.meta.title} - OpenAdmin`
        } else {
            document.title = 'OpenAdmin'
        }
    })

    return router
}
