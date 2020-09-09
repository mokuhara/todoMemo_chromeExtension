<template>
  <div>
    <div @click="submit">
      <span class="btn">{{ text }}</span>
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

<style lang="scss" scoped>
.btn {
  padding: 10px 20px;
  background-color: rgb(43, 171, 159);
  color: #fff;
  border-radius: 3px;
  text-align: center;
}
</style>
