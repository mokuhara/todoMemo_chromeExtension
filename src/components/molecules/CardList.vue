<template>
  <div>
    <div>
      <div v-if="type === 'memo'">
        <ul v-for="(memo, index) in memoCards" :key="index">
          <li></li>
        </ul>
      </div>
      <div v-if="type === 'todo'">
        <ul v-for="(todo, index) in todoCards" :key="index">
          <li>
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
  },
  mmethods: {
    ...mapActions(["getFromRepository"]),
  },
  mounted() {
    const type = "todo";
    this.$store.dispatch("getFromRepository", type);
  },
};
</script>

<style lang="scss" scoped></style>
