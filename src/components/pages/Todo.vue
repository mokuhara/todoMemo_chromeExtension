<template>
  <div>
    todo
    {{ todo }}
    <!-- {{ todoCards }} -->
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

import { mapState } from "vuex";

export default {
  components: {
    NewButton,
    Modal,
    CreateTodo,
  },
  computed: {
    ...mapState(["modalIsOpen", "todo", "todoCards"]),
  },
};
</script>

<style lang="scss" scoped></style>
