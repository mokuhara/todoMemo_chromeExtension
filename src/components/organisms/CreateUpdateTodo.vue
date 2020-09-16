<template>
  <div>
    <div class="container">
      <div>
        <InputIcon :type="type" />
      </div>
      <div class="Wrapper">
        <InputText :type="type" />
      </div>
      <div class="Wrapper" v-if="type === 'todo'">
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
import MarkdownText from "../molecules/MarkdownText";

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
    MarkdownText,
  },
  computed: {
    ...mapState(["todo", "memo", "searchKeyword"]),
  },
  methods: {
    ...mapActions(["pushMT", "getFromRepository", "searchFromRepository"]),
    ...mapMutations([
      "createTimeStamp",
      "changeMordalStatus",
      "setSearchKeyword",
    ]),
    changeMT() {
      if (this.validateNullInput()) return;
      this.createTimeStamp({ type: this.type, method: this.method });
      this.pushMT({ type: this.type, method: this.method });
      if (this.searchKeyword) {
        this.searchFromRepository(this.searchKeyword);
        this.setSearchKeyword = "";
      }
      this.changeMordalStatus();
    },
    validateNullInput() {
      const MT = this.type === "memo" ? this.memo : this.todo;
      if (!MT) throw new Error("validateNullInput: null error");
      if (!MT.text || !MT.pageUrl || !MT.pageTitle) {
        alert("空白の値があります。");
        return true;
      } else if (this.type === "todo" && !MT.dateRange) {
        alert("日付を設定ください");
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
