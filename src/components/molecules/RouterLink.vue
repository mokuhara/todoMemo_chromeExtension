<template>
  <div>
    <div>
      <router-link
        @click.native="changeLink"
        class="routerLink"
        :to="'/' + path"
        >{{ text }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  props: {
    path: String,
    text: String,
  },
  methods: {
    ...mapMutations(["changeActiveRouterLink"]),
    changeLink() {
      this.changeActiveRouterLink(this.text);
    },
  },
};
</script>

<style lang="scss" scoped>
.routerLink {
  text-decoration: none;
  font-size: 14px;
  color: #000;

  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>
