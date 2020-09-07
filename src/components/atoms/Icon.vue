<template>
  <div>
    <div>
      <a :href="href">
        <img :src="imgSrc" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    href: String,
    imgSrc: String,
  },
};
</script>

<style lang="scss" scoped>
</style>