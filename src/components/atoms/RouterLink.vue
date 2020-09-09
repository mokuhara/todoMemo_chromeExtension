<template>
  <div>
    <div>
      <router-link class="routerLink" :to="'/' + path">{{ text }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    path: String,
    text: String,
  },
};
</script>

<style lang="scss" scoped>
.routerLink {
  text-decoration: none;
  font-size: 14px;
  color:#000;
}
</style>
