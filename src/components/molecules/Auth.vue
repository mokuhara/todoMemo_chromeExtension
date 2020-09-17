<template>
  <div>
    {{ user }}
    <div v-if="user.isLogin === false">
      <div clss="btn" @click="_signIn">
        ログイン
      </div>
    </div>

    <div v-if="user.isLogin === true">
      <div clss="btn" @click="_signOut">
        ログアウト
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["signIn", "signOut"]),
    _signIn() {
      this.signIn();
    },
    _signOut() {
      this.signOut();
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  width: 50px;
  padding: 5px;
}
</style>
