<template>
  <div>
    <div>
      <div class="container" v-if="type === 'memo'">
        {{ memoCards }}
        <draggable tag="ul" class="itemList">
          <li v-for="(memo, index) in _memoCards" :key="index">
            <MemoCard
              :id="memo.id"
              :text="memo.text"
              :updated_at="memo.updated_at"
              :pageUrl="memo.pageUrl"
              :pageTitle="memo.pageTitle"
              :favIconUrl="memo.favIconUrl"
              :tags="memo.tags"
              :isShared="memo.isShared"
            />
          </li>
        </draggable>
      </div>
      <div class="container" v-if="type === 'todo'">
        <draggable tag="ul" class="itemList">
          <li v-for="(todo, index) in _todoCards" :key="index">
            <TodoCard
              :id="todo.id"
              :text="todo.text"
              :updated_at="todo.updated_at"
              :pageUrl="todo.pageUrl"
              :pageTitle="todo.pageTitle"
              :favIconUrl="todo.favIconUrl"
              :tags="todo.tags"
              :done="todo.done"
              :dateRange="todo.dateRange"
            />
          </li>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import TodoCard from "./TodoCard";
import MemoCard from "./MemoCard";

import draggable from "vuedraggable";

import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: {
    type: String,
    method: String,
  },
  computed: {
    ...mapState([
      "memoCards",
      "todoCards",
      "searchMemoCards",
      "searchTodoCards",
      "unDoneTodoCards",
      "unDoneFilter",
      "memo",
      "todo",
      "isShared",
      "user",
    ]),
    _todoCards() {
      if (this.method === "search") {
        return this.searchTodoCards;
      }
      if (this.unDoneFilter) {
        return this.unDoneTodoCards;
      }
      return this.todoCards;
    },
    _memoCards() {
      if (this.method === "search") {
        return this.searchMemoCards;
      }
      return this.memoCards;
    },
  },
  components: {
    TodoCard,
    MemoCard,
    draggable,
  },
  methods: {
    ...mapActions(["getFromRepository"]),
    ...mapMutations(["changeIsShared"]),
  },
  watch: {
    type(value) {
      this.$store.dispatch("getFromRepository", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.itemList {
  list-style: none;
  padding-inline-start: 0;
  margin: 5px 10px;
}
</style>
