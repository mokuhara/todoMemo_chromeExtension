<template>
  <div>
    <!-- {{ mtMode }}
    todo
    {{ todo }}
    todocard
    {{ todoCards }} -->
    <div class="container">
      <div class="doneWrapper">
        <div>未完了フィルター</div>
        <InputCheck :checked="unDoneFilter" :callBack="_changeUndoneFlg" />
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
import InputCheck from "../molecules/InputCheck";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      type: "filter",
    };
  },
  components: {
    NewButton,
    Modal,
    CreateUpdateTodo,
    CardList,
    InputCheck,
  },
  computed: {
    ...mapState(["modalIsOpen", "todo", "todoCards", "mtMode", "unDoneFilter"]),
  },
  methods: {
    ...mapMutations(["changeMTmode", "changeUndoneFlg"]),
    ...mapActions(["getFromRepository"]),
    _changeUndoneFlg() {
      this.changeUndoneFlg();
    },
  },
  mounted() {
    const payload = {
      type: "todo",
      method: "create",
      submitButtonText: "todoをつくる",
    };
    this.changeMTmode(payload);
    this.getFromRepository("todo");
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
}

.doneWrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
