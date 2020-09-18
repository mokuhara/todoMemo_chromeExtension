<template>
  <div>
    <div v-if="wikiMemoCards">
      <ul class="itemList">
        <li v-for="(memo, index) in wikiMemoCards" :key="index">
          <WikiCard
            :id="memo.id"
            :text="memo.text"
            :updated_at="memo.updated_at"
            :pageUrl="memo.pageUrl"
            :pageTitle="memo.pageTitle"
            :favIconUrl="memo.favIconUrl"
            :tags="memo.tags"
            :userName="memo.userName"
            :userIconUrl="memo.userIconUrl"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import WikiCard from "../molecules/WikiCard";

import { mapState, mapActions, mapMutations } from "vuex";

export default {
  computed: {
    ...mapState(["wikiMemoCards", "user"]),
  },
  components: {
    WikiCard,
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
