<template>
  <div>
    <div class="container" v-if="type === 'link'">
      <ul class="linkList">
        <li class="linkText" v-for="(link, index) in linkList" :key="index">
          <Link :href="link.href" :text="link.text" />
        </li>
      </ul>
    </div>
    <div class="container" v-if="type === 'routerLink'">
      <ul class="linkList">
        <li
          class="linkText"
          :class="{ active: activeRouterLink === link.text }"
          v-for="(link, index) in linkList"
          :key="index"
        >
          <RouterLink :path="link.path" :text="link.text" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import RouterLink from "../molecules/RouterLink";
import Link from "../atoms/Link";

import { mapState } from "vuex";

export default {
  props: {
    linkList: Array,
    type: String,
  },
  computed: {
    ...mapState(["activeRouterLink"]),
  },
  components: {
    RouterLink,
    Link,
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
}
.linkList {
  list-style: none;
  padding-inline-start: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.linkText {
  display: inline-block;
  width: 100%;
  text-align: center;
}

.active {
  background-color: rgb(246, 246, 244);
}
</style>
