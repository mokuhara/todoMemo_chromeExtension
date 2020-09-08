<template>
  <div>
    <div>
      <a :href="href" target="_blank">
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

<style lang="scss" scoped></style>
