<template>
  <div>
    <div class="container" v-if="type === 'link'">
      <ul class="linkList" v-for="(link, index) in linkList" :key="index">
        <li class="linkText">
          <Link :href="link.href" :text="link.text" />
        </li>
      </ul>
    </div>
    <div class="container" v-if="type === 'routerLink'">
      <ul class="linkList" v-for="(link, index) in linkList" :key="index">
        <li class="linkText">
          <RouterLink :path="link.path" :text="link.text" />
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
.container {
  display: flex;
  justify-content: space-between;
}
.linkList {
  list-style: none;
  padding-inline-start: 0;
  margin: 0;
}

.linkText {
  display: inline-block;
  padding: 10px 5px;
}
</style>
