<template>
  <div>
    <div class="container">
      <div class="archiveWrapper">
        <div class="archiveTitle">アーカイブ</div>
        <div><InputSwitch :callback="callback" /></div>
      </div>
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
import InputSwitch from "../molecules/InputSwitch";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
  components: {
    NewButton,
    Modal,
    CreateUpdateTodo,
    CardList,
    InputSwitch,
  },
  computed: {
    ...mapState([
      "modalIsOpen",
      "memo",
      "memoCards",
      "mtMode",
      "archiveMemoCards",
    ]),
  },
  methods: {
    ...mapMutations(["changeMTmode", "changArchiveStatus"]),
    ...mapActions(["checkLogin", "getFromRepository"]),
    callback(bool) {
      this.changArchiveStatus(bool);
    },
  },
  mounted() {
    const payload = {
      type: "memo",
      method: "create",
      submitButtonText: "memoをつくる",
    };
    this.changeMTmode(payload);
    this.checkLogin();
    this.getFromRepository("memo");
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
}

.archiveWrapper {
  display: flex;
  justify-content: flex-end;
}

.archiveTitle {
  padding-right: 5px;
}
</style>
