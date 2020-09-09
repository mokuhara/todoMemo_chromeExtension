<template>
  <div>
    <div>
      <ul v-for="(tag, index) in tags" :key="index">
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

<style lang="scss" scoped></style>
