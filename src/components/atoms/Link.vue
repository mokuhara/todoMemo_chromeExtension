<template>
  <div>
    <a :href="href">{{ text }}</a>
  </div>
</template>

<script>
export default {
  props: {
    href: String,
    text: String,
  },
};
</script>

<style lang="scss" scoped>
</style>