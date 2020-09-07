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
export default {
  data() {
    return {
      value: "",
    };
  },
  methods: {
    onBlurTextarea() {},
  },
};
</script>

<style lang="scss" scoped></style>
