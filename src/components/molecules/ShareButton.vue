<template>
  <div>
    <div v-if="user.isLogin">
      <div v-if="isShared">
        <div @click="unSharedMemo">
          <span class="btn">共有解除</span>
        </div>
      </div>
      <div v-if="!isShared">
        <div @click="shareMemo">
          <span class="btn">共有する</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: {
    mtId: String,
    text: String,
    updated_at: String,
    pageUrl: String,
    pageTitle: String,
    favIconUrl: String,
    tags: Array,
    isShared: Boolean,
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["wikiHandler"]),
    shareMemo() {
      if (!this.user.isLogin) return;
      const payload = {
        method: "create",
        id: this.mtId,
        userName: this.user.name,
        userIconUrl: this.user.iconUrl,
        updated_at: this.updated_at,
        text: this.text,
        pageUrl: this.pageUrl,
        pageTitle: this.pageTitle,
        favIconUrl: this.favIconUrl,
        tags: this.tags,
      };
      console.log(payload);
      this.wikiHandler(payload);
    },
    unSharedMemo() {
      const payload = {
        method: "delete",
        id: this.mtId,
      };
      this.wikiHandler(payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  padding: 3px 8px;
  background-color: rgb(240, 202, 36);
  color: #fff;
  border-radius: 3px;
}
</style>
