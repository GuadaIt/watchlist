import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login/Login.vue";
import BaseLayout from "../views/BaseLayout/Base.vue";
import Home from "../views/Home/Home.vue";
import ItemDetails from "../views/ItemDetails/ItemDetails.vue";
import SearchResults from "../views/SearchResults/SearchResults.vue";
import { auth } from "../services/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: () => import(/* webpackChunkName: "register" */ '../views/Register/Register.vue')
  },
  {
    path: "/home",
    component: BaseLayout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/",
        component: Home,
        name: "Home",
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/search",
        component: SearchResults,
        name: "SearchResults",
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "/:mediaType/:id",
        component: ItemDetails,
        name: "ItemDetails",
        meta: {
          requiresAuth: true
        }
      }      
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//checks if user is logged in and can therefore access routes that require auth
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;
  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;