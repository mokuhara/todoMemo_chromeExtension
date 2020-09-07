<template>
  <div>
    <div v-if="type==='link'">
      <ul v-for="(link, index) in linkList" :key="index">
        <li>
          <Link :href="link.href" :text="link.text" />
        </li>
      </ul>
    </div>
    <div v-if="type==='routerLink'">
      <ul v-for="(link, index) in linkList" :key="index">
        <li>
          <RouterLink :href="link.path" :text="link.text" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import RouterLink from "../atoms/RouterLink";
import Link from "../atoms/Link";

export default {
  props: {
    linkList: Array,
    type: String,
  },
  components: {
    RouterLink,
    Link,
  },
};
</script>

<style lang="scss" scoped>
</style>