<template>
  <div>
    <div>
      <span class="tag">{{ tag.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tag: Object,
  },
};
</script>

<style lang="scss" scoped>
.tag {
  display: inline-block;
  height: 12px;
  padding: 3px 8px;
  background-color: rgb(43, 171, 159);
  color: #fff;
  border-radius: 3px;
  text-align: center;
  font-size: 8px;
  display: flex;
  align-items: center;
}
</style>
