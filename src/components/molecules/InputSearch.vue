<template>
  <div>
    <div class="container">
      <div class="inputWrapper">
        <input type="text" v-model="value" :placeholder="inputPlaceholder" />
        <!-- <input type="text" v-model="value" placeholder="キーワードを入力" /> -->
      </div>
      <div class="btnWrapper">
        <SubmitButton
          :text="submitButtonText"
          :callback="callback"
          :arg="value"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SubmitButton from "../atoms/SubmitButton";

export default {
  data() {
    return {
      value: "",
    };
  },
  props: {
    submitButtonText: String,
    inputPlaceholder: String,
    callback: Function,
  },
  components: {
    SubmitButton,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}

.inputWrapper {
  width: 70%;
  margin-right: 10px;
}

.inputWrapper input {
  width: 100%;
  padding: 5px 5px;
  font-size: 12px;
  border-radius: 3px;
  border: 2px solid #ddd;
  box-sizing: border-box;
}

.btnWrapper {
  display: flex;
  align-items: center;
  width: 30%;
  margin: 0;
}
</style>
