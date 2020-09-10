<template>
  <div>
    <div>
      <div v-if="isSearchTodoCards">
        <div class="title">todo検索結果</div>
        <CardList :type="todo" :method="method" />
      </div>
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
</template>

<script>
import InputSearch from "../molecules/InputSearch";
import CardList from "../molecules/CardList";
import Modal from "../molecules/Modal";
import CreateUpdateTodo from "../organisms/CreateUpdateTodo";

import { mapState, mapMutations } from "vuex";

export default {
  components: {
    InputSearch,
    CardList,
    Modal,
    CreateUpdateTodo,
  },
  data() {
    return {
      todo: "todo",
      method: "search",
    };
  },
  computed: {
    ...mapState(["searchTodoCards", "modalIsOpen", "mtMode"]),
    isSearchTodoCards() {
      return this.searchTodoCards.length;
    },
  },
  methods: {
    ...mapMutations(["changeMTmode"]),
  },
  mounted() {
    const payload = {
      type: "todo",
      method: "update",
      submitButtonText: "todoを更新する",
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
