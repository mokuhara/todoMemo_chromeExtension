<template>
  <div>
    <div class="routerLink">
      <router-link :to="'/' + path">{{ text }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: String,
    text: String,
  },
};
</script>

<style lang="scss" scoped>
</style>