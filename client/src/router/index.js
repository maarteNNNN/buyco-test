import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/users',
    name: 'UsersIndex',
    component: () =>
      import(/* webpackChunkName: "usersindex" */ '../views/users/Index.vue'),
    children: [
      {
        path: '',
        name: 'UserList',
        component: () =>
          import(
            /* webpackChunkName: "registeruser" */ '../views/users/UserList.vue'
          ),
      },
      {
        path: 'register',
        name: 'RegisterUser',
        component: () =>
          import(
            /* webpackChunkName: "registeruser" */ '../views/users/RegisterUser.vue'
          ),
      },
      {
        path: ':id',
        name: 'UserDetails',
        component: () =>
          import(
            /* webpackChunkName: "userdetails" */ '../views/users/UserDetails.vue'
          ),
      },
      {
        path: 'edit/:id',
        name: 'EditUser',
        component: () =>
          import(
            /* webpackChunkName: "userdetails" */ '../views/users/EditUser.vue'
          ),
      },
    ],
  },
  {
    path: '*',
    component: () =>
      import(/* webpackChunkName: "error404" */ '../views/Error404.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
