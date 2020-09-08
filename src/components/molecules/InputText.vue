<template>
  <div>
    <textarea-autosize
      placeholder="ここに記入してください"
      ref="myTextarea"
      v-model="value"
      :min-height="16"
      :max-height="350"
      @blur.native="onBlurTextarea"
      style="min-width:80%"
    />
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      value: "",
    };
  },
  props: {
    type: String,
  },
  methods: {
    ...mapMutations(["storeMTToState"]),
    onBlurTextarea() {
      this.storeMTToState({
        type: this.type,
        dtype: "text",
        data: this.value,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
