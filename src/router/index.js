import { createRouter, createWebHistory } from 'vue-router'
import Middleware from './middleware'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/about',
      component: () => import('@/views/AboutView.vue')
    }
    
    // Auth
    ,{
      path: '/login',
      component: () => import('@/views/LoginView.vue')
    },{
      path: '/register',
      component: () => import('@/views/RegisterView.vue')
    }

    // posts
    ,{
      path: '/posts',
      component: () => import('@/views/post/PostsView.vue'),
      props: { type: 'ALL' }
    },{
      path: '/posts/following',
      component: () => import('@/views/post/PostsView.vue'),
      props: { type: 'FOLLOWING' }
    },{
      path: '/posts/create',
      component: () => import('@/views/post/PostCreateView.vue'),
    },{
      path: '/posts/:idPost',
      component: () => import('@/views/post/PostDetailView.vue')
    }
    
    // profile
    ,{
      path: '/profile/:idUser',
      component: () => import('@/views/profile/ProfileView.vue')
    },{
      path: '/profile/update',
      component: () => import('@/views/profile/UpdateProfileView.vue')
    }
    
    // Chats
    ,{
      path: '/chats',
      component: () => import('@/views/ChatView.vue')
    },{
      path: '/chats/:idChat',
      component: () => import('@/views/ChatView.vue')
    }
  ]
})

new Middleware(router)
export default router
