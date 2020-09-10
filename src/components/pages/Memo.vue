<template>
  <div>
    <!-- {{ mtMode }}
    memo
    {{ memo }}
    memocard
    {{ memoCards }} -->
    <div class="container">
      <CardList :type="mtMode.type" />
    </div>
    <NewButton />
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
import CreateUpdateTodo from "../organisms/CreateUpdateTodo";
import NewButton from "../molecules/NewButton";
import Modal from "../molecules/Modal";
import CardList from "../molecules/CardList";

import { mapState, mapMutations } from "vuex";

export default {
  components: {
    NewButton,
    Modal,
    CreateUpdateTodo,
    CardList,
  },
  computed: {
    ...mapState(["modalIsOpen", "memo", "memoCards", "mtMode"]),
  },
  methods: {
    ...mapMutations(["changeMTmode"]),
  },
  mounted() {
    const payload = {
      type: "memo",
      method: "create",
      submitButtonText: "memoをつくる",
    };
    this.changeMTmode(payload);
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
}
</style>
