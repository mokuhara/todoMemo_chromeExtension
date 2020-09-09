<template>
  <div>
    {{ mtMode }}
    todo
    {{ todo }}
    todocard
    {{ todoCards }}
    <div>
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
    ...mapState(["modalIsOpen", "todo", "todoCards", "mtMode"]),
  },
  methods: {
    ...mapMutations(["changeMTmode"]),
  },
  mounted() {
    const payload = {
      type: "todo",
      method: "create",
      submitButtonText: "todoをつくる",
    };
    this.changeMTmode(payload);
  },
};
</script>

<style lang="scss" scoped></style>
