<template>
  <div>
    <div class="container">
      <InputSearch />
    </div>
    <div>
      <div v-if="isSearchMemoCards">
        <div class="title">memo検索結果</div>
        <CardList :type="memo" :method="method" />
      </div>
      <div v-if="isSearchTodoCards">
        <div class="title">todo検索結果</div>
        <CardList :type="todo" :method="method" />
      </div>
    </div>
  </div>
</template>

<script>
import InputSearch from "../molecules/InputSearch";
import CardList from "../molecules/CardList";

import { mapState } from "vuex";

export default {
  components: {
    InputSearch,
    CardList,
  },
  data() {
    return {
      todo: "todo",
      memo: "memo",
      method: "search",
    };
  },
  computed: {
    ...mapState(["searchMemoCards", "searchTodoCards"]),
    isSearchMemoCards() {
      return this.searchMemoCards.length;
    },
    isSearchTodoCards() {
      return this.searchTodoCards.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 30px;
}

.title {
  font-size: 14px;
  font-weight: bold;
}
</style>
