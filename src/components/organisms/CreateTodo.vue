<template>
  <div>
    <div class="container">
      <div>
        <InputIcon :type="type" />
      </div>
      <div>
        <InputText :type="type" />
      </div>
      <div>
        <InputCalender :type="type" />
      </div>
      <div>
        <InputTag :type="type" />
      </div>
      <div>
        <InputCheck />
      </div>
      <div>
        <SubmitButton :text="submitButtonText" :callback="createTodo" />
      </div>
    </div>
  </div>
</template>

<script>
import InputTag from "../molecules/InputTag";
import InputText from "../molecules/InputText";
import InputCalender from "../molecules/InputCalender";
import InputIcon from "../molecules/InputIcon";
import SubmitButton from "../atoms/SubmitButton";
import InputCheck from "../molecules/InputCheck";

import { mapActions, mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      submitButtonText: "todoをつくる",
      type: "todo",
    };
  },
  components: {
    InputTag,
    InputText,
    InputCalender,
    InputIcon,
    SubmitButton,
    InputCheck,
  },
  computed: {
    ...mapState(["todo"]),
  },
  methods: {
    ...mapActions(["pushMT"]),
    ...mapMutations(["createTimeStamp", "changeMordalStatus"]),
    createTodo() {
      if (this.validateNullInput()) return;
      this.createTimeStamp({ type: "todo", method: "create" });
      this.pushMT({ type: "todo", method: "create" });
      this.changeMordalStatus();
    },
    validateNullInput() {
      const todo = this.todo;
      if (
        !todo.text ||
        !todo.pageUrl ||
        !todo.pageTitle ||
        !todo.favIconUrl ||
        !todo.dateRange
      ) {
        alert("空白の値があります。");
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>
