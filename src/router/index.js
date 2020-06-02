import Vue from 'vue'
import VueRouter from 'vue-router'
import ShoppingMall from '@/views/ShoppingMall.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Goods from '@/views/Goods.vue'
import CategoryList from '@/views/CategoryList.vue'
import Cart from '@/views/Cart.vue'
import Main from '@/views/Main.vue'

Vue.use(VueRouter)

  const routes = [
 {
      path:'/register',
      name:'Register',
      component:Register
  },{
      path:'/login',
      name:'Login',
      component:Login
  },{
      path:'/goods',
      name:'Goods',
      component:Goods
  },
  {
      path:'/main',
      component:Main,
      children:[
        {
            path: '/',
            name: 'ShoppingMall',
            component: ShoppingMall
          },
          {
              path:'/CategoryList',
              name:'CategoryList',
              component:CategoryList
          },{
              path:'/cart',
              name:'Cart',
              component:Cart
          }
      ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
