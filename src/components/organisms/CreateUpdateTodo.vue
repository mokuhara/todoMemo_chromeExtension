<template>
  <div>
    <div class="container">
      <div>
        <InputIcon :type="type" />
      </div>
      <div class="Wrapper">
        <InputText :type="type" />
      </div>
      <div class="Wrapper">
        <InputCalender :type="type" />
      </div>
      <div class="Wrapper">
        <InputTag :type="type" />
      </div>
      <div class="Wrapper btn">
        <SubmitButton :text="submitButtonText" :callback="changeMT" />
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
  props: {
    type: String,
    method: String,
    submitButtonText: String,
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
    changeMT() {
      if (this.validateNullInput()) return;
      this.createTimeStamp({ type: this.type, method: this.method });
      this.pushMT({ type: this.type, method: this.method });
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

.Wrapper {
  margin-top: 15px;
}

.btn {
  display: flex;
  justify-content: flex-end;
  margin: 30px auto;
}
</style>
