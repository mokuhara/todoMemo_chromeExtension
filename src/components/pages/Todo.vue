<template>
  <div>
    todo
    {{ todo }}
    {{ todoCards }}
    <div>
      <CardList :type="type" />
    </div>
    <NewButton />
    <div v-if="modalIsOpen">
      <Modal>
        <CreateTodo />
      </Modal>
    </div>
  </div>
</template>

<script>
import CreateTodo from "../organisms/CreateTodo";
import NewButton from "../molecules/NewButton";
import Modal from "../molecules/Modal";
import CardList from "../molecules/CardList";

import { mapState } from "vuex";

export default {
  data() {
    return {
      type: "todo",
    };
  },
  components: {
    NewButton,
    Modal,
    CreateTodo,
    CardList,
  },
  computed: {
    ...mapState(["modalIsOpen", "todo", "todoCards"]),
  },
};
</script>

<style lang="scss" scoped></style>
