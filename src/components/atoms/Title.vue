<template>
  <div>
    <div class="title">
      <h2>{{ title }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped>
.title h2 {
  font-size: 12px;
  padding: 0;
  margin: 0;
}
</style>
