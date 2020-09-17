import Vue from "vue";
import VueRouter from "vue-router";
import Memo from "../components/pages/Memo.vue";
import Todo from "../components/pages/Todo.vue";
import Serach from "../components/pages/Search.vue";
import Wiki from "../components/pages/Wiki.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/memo",
    name: "Memo",
    component: Memo,
  },
  {
    path: "/",
    name: "Todo",
    component: Todo,
  },
  {
    path: "/search",
    name: "Serach",
    component: Serach,
  },
  {
    path: "/wiki",
    name: "wiki",
    component: Wiki,
  },
];

const router = new VueRouter({
  routes,
});

export default router;