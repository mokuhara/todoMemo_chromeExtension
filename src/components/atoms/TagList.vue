<template>
  <div>
    <div class="container">
      <ul class="tagList" v-for="(tag, index) in tags" :key="index">
        <li>
          <Tag :tag="tag" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Tag from "./Tag";

export default {
  props: {
    tags: Array,
  },
  components: {
    Tag,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
.tagList {
  list-style: none;
  padding-inline-start: 0;
  margin: 5px;
  margin-left: 0px;
}
</style>
