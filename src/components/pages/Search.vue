<template>
  <div>
    <div class="container">
      <InputSearch />
    </div>
    <div
      v-if="
        (!searchMemoCards.length || !searchTodoCards.length) && searchKeyword
      "
    >
      <span class="noItem">itemがありません</span>
    </div>
    <div>
      <SearchMemoContent />
      <SearchTodoContent />
    </div>
    <!-- <div>
      <div v-if="isSearchMemoCards">
        <div class="title">memo検索結果</div>
        <CardList :type="memo" :method="method" />
      </div>
      <div v-if="isSearchTodoCards">
        <div class="title">todo検索結果</div>
        <CardList :type="todo" :method="method" />
      </div>
    </div> -->
  </div>
</template>

<script>
import InputSearch from "../molecules/InputSearch";
import CardList from "../molecules/CardList";
import SearchMemoContent from "../molecules/SearchMemoContent";
import SearchTodoContent from "../molecules/SearchTodoContent";

import { mapState } from "vuex";

export default {
  components: {
    InputSearch,
    CardList,
    SearchMemoContent,
    SearchTodoContent,
  },
  data() {
    return {
      todo: "todo",
      memo: "memo",
      method: "search",
    };
  },
  computed: {
    ...mapState(["searchMemoCards", "searchTodoCards", "searchKeyword"]),
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

.noItem {
  color: rgba(0, 0, 0, 0.5);
}
</style>
