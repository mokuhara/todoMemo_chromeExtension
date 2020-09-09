<template>
  <div>
    <div class="container">
      <LinkList :linkList="RouterLinkText" :type="routerLink" />
    </div>
  </div>
</template>

<script>
import LinkList from "../molecules/LinkList";

import { mapState } from "vuex";

export default {
  data() {
    return {
      routerLink: "routerLink",
    };
  },
  computed: {
    ...mapState(["RouterLinkText"]),
  },
  components: {
    LinkList,
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  top: 0;
  width: 95%;
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
