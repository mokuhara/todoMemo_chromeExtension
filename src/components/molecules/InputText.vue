<template>
  <div>
    <div class="text">本文</div>
    <textarea-autosize
      placeholder="ここに記入してください"
      ref="myTextarea"
      v-model="value"
      :min-height="16"
      :max-height="350"
      @blur.native="onBlurTextarea"
      style="width:100%"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      value: "",
    };
  },
  props: {
    type: String,
  },
  computed: {
    ...mapState(["todo", "memo", "mtMode"]),
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
  mounted() {
    if (this.mtMode.method === "update")
      if (this.type === "memo") {
        this.value = this.memo.text;
      } else if (this.type === "todo") {
        this.value = this.todo.text;
      }
  },
};
</script>

<style lang="scss" scoped>
.text {
  color: rgba(0, 0, 0, 0.5);
}
</style>
