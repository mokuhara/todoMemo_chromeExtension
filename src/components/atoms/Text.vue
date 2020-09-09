<template>
  <div>
    <div class="text">
      <p>{{ mtext }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mtext: String,
  },
};
</script>

<style lang="scss" scoped>
.text {
  padding: 0;
  margin: 0;
}
</style>
