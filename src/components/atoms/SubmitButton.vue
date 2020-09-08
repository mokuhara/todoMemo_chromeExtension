<template>
  <div>
    <div @click="submit">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    callback: Function,
  },
  methods: {
    submit() {
      this.callback();
    },
  },
};
</script>

<style lang="scss" scoped></style>
