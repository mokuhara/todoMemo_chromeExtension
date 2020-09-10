<template>
  <div>
    <div class="inputWrapper">
      <input type="text" v-model="value" placeholder="キーワードを入力" />
    </div>
    <div class="btnWrapper">
      <SubmitButton :text="submitButtonText" :callback="callback" />
    </div>
  </div>
</template>

<script>
import SubmitButton from "../atoms/SubmitButton";

import { mapActions } from "vuex";

export default {
  data() {
    return {
      value: "",
      submitButtonText: "検索する",
      callback: this.searchText,
    };
  },
  components: {
    SubmitButton,
  },
  methods: {
    ...mapActions(["searchFromRepository"]),
    searchText() {
      this.searchFromRepository(this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.inputWrapper input {
  width: 70%;
  margin-top: 20px;
  padding: 10px 15px;
  font-size: 14px;
  border-radius: 3px;
  border: 2px solid #ddd;
  box-sizing: border-box;
}

.btnWrapper {
  margin: 20px 0px;
}
</style>
