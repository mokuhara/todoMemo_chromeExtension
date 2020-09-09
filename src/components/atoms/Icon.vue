<template>
  <div>
    <div class="icon">
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

<style lang="scss" scoped>
.icon img {
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 50%;
}
</style>
