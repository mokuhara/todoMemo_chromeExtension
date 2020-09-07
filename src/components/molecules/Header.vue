<template>
  <div>
    <div>
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
</style>