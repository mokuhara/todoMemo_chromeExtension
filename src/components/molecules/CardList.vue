<template>
  <div>
    <div>
      <div class="container" v-if="type === 'memo' && _memoCards">
        <draggable @end="changeOrder" tag="ul" class="itemList memo">
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
              :isArchive="memo.isArchive"
              :data-content="JSON.stringify(memo)"
            />
          </li>
        </draggable>
      </div>
      <div class="container" v-if="type === 'todo' && _todoCards">
        <draggable @end="changeOrder" tag="ul" class="itemList todo">
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
              :data-content="JSON.stringify(todo)"
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
  data() {
    return {
      items: [],
      isOrder: false,
    };
  },
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
      "archiveMemoCards",
      "unDoneFilter",
      "archiveFilter",
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
      if (this.archiveFilter) {
        return this.archiveMemoCards;
      }
      const filterMemos = this.memoCards.filter((memo) => {
        return !memo.isArchive;
      });
      return filterMemos;
    },
  },
  components: {
    TodoCard,
    MemoCard,
    draggable,
  },
  methods: {
    ...mapActions(["getFromRepository", "setOrder"]),
    ...mapMutations(["changeIsShared"]),
    changeOrder() {
      const elem = document.querySelector(`.${this.type}`);
      const items = Array.from(elem.children);
      let result = [];
      items.forEach((item, index) => {
        const target = item.firstElementChild;
        const _item = JSON.parse(target.dataset.content);
        _item.order = index;
        result.push(_item);
      });
      this.items = result;
      this.isOrder = true;
    },
  },
  watch: {
    type(value) {
      this.$store.dispatch("getFromRepository", value);
    },
  },
  beforeDestroy() {
    if (this.isOrder) {
      const payload = {
        type: this.type,
        data: this.items,
      };
      this.setOrder(payload);
    }
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
