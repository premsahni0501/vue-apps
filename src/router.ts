import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'App List',
      component: Home
    },
    {
      path: '/todo-app',
      name: 'TodoApp',
      component: () => import('./views/TodoApp.vue')
    },
    {
      path: '/calculator-app',
      name: 'Calculator',
      component: () => import('./views/CalculatorApp.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('./views/About.vue'),
    },
    {
      path: '/clock',
      name: 'Clock',
      component: () => import('./views/Clock.vue'),
    },
    {
      path: '/flappy',
      name: 'Flappy',
      component: () => import('./views/Flappy.vue'),
    },
    {
      path: '*',
      name: '404 Not Found',
      component: () => import('./views/404.vue'),
    }
  ],
});
