<template>
  <div>
    <div>
      <div class="container" v-if="type === 'memo'">
        <ul class="itemList">
          <li v-for="(memo, index) in memoCards" :key="index">
            <MemoCard
              :id="memo.id"
              :text="memo.text"
              :updated_at="memo.updated_at"
              :pageUrl="memo.pageUrl"
              :pageTitle="memo.pageTitle"
              :favIconUrl="memo.favIconUrl"
              :tags="memo.tags"
            />
          </li>
        </ul>
      </div>
      <div class="container" v-if="type === 'todo'">
        <ul class="itemList">
          <li v-for="(todo, index) in todoCards" :key="index">
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
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TodoCard from "./TodoCard";
import MemoCard from "./MemoCard";

import { mapState, mapActions } from "vuex";

export default {
  props: {
    type: String,
  },
  computed: {
    ...mapState(["memoCards", "todoCards"]),
  },
  components: {
    TodoCard,
    MemoCard,
  },
  mmethods: {
    ...mapActions(["getFromRepository"]),
  },
  watch: {
    type(value) {
      this.$store.dispatch("getFromRepository", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
}

.itemList {
  list-style: none;
  padding-inline-start: 0;
  margin: 5px 10px;
}
</style>
