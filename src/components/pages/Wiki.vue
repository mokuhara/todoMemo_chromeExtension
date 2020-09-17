<template>
  <div>
    <div class="container">
      <div>
        <Auth />
      </div>
      <div>
        <WikiList />
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../molecules/Auth";
import WikiList from "../molecules/WikiList";

import { mapActions } from "vuex";

export default {
  components: {
    Auth,
    WikiList,
  },
  methods: {
    ...mapActions(["wikiHandler", "checkLogin"]),
  },
  mounted() {
    const payload = {
      method: "get",
    };
    this.wikiHandler(payload);
    this.checkLogin();
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
}
</style>
