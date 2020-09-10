<template>
  <div>
    <div>
      <div v-if="isSearchMemoCards">
        <div class="title">memo検索結果</div>
        <CardList :type="memo" :method="method" />
      </div>
      <div v-if="modalIsOpen">
        <Modal>
          <CreateUpdateTodo
            :type="mtMode.type"
            :method="mtMode.method"
            :submitButtonText="mtMode.submitButtonText"
          />
        </Modal>
      </div>
    </div>
  </div>
</template>

<script>
import InputSearch from "../molecules/InputSearch";
import CardList from "../molecules/CardList";
import Modal from "../molecules/Modal";
import CreateUpdateTodo from "../organisms/CreateUpdateTodo";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
  components: {
    InputSearch,
    CardList,
    Modal,
    CreateUpdateTodo,
  },
  data() {
    return {
      memo: "memo",
      method: "search",
    };
  },
  computed: {
    ...mapState(["searchMemoCards", "modalIsOpen", "mtMode"]),
    isSearchMemoCards() {
      return this.searchMemoCards.length;
    },
  },
  methods: {
    ...mapMutations(["changeMTmode"]),
  },
  mounted() {
    const payload = {
      type: "memo",
      method: "update",
      submitButtonText: "memoを更新する",
    };
    this.changeMTmode(payload);
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
