import Vue from 'vue'
import VueRouter from 'vue-router'
import Memo from '../components/pages/Memo.vue'
import Todo from '../components/pages/Todo.vue'
import Serach from '../components/pages/Search.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/memo',
    name: 'Memo',
    component: Memo
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/search',
    name: 'Serach',
    component: Serach
  }
]

const router = new VueRouter({
  routes
})

export default router