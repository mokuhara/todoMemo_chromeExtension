<template>
  <div>
    <div class="container">
      <ul class="tagWrapper">
        <li class="tagList" v-for="(tag, index) in tags" :key="index">
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
.tagWrapper {
  display: flex;
  padding-inline-start: 0;
}
.tagList {
  list-style: none;
  margin: 5px;
  margin-left: 0px;
}
</style>
