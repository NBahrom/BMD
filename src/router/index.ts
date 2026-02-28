import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { i18n } from '@/i18n'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // browser back/forward button
    if (savedPosition) {
      return savedPosition
    }

    // always scroll to top on route change
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        titleKey: 'meta.homeTitle'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy policy',
      component: () => import('../views/PrivacyPolicyView.vue'),
    },
    {
      path: '/singers/:id',
      name: 'singer',
      component: () => import('../views/SingerView.vue'),
      props: true
    }
  ],
})

router.afterEach((to) => {
  const titleKey = to.meta.titleKey as string
  if (titleKey) {
    document.title = i18n.global.t(titleKey)
  }

  if (typeof window !== 'undefined' && (window as any).ym) {
    ;(window as any).ym(107036842, 'hit', to.fullPath)
  }
})

export default router
