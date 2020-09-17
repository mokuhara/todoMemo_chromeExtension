<template>
  <div>
    <div class="container">
      <div v-if="user.isLogin === false">
        <div class="btn" @click="_signIn">
          ログイン
        </div>
      </div>

      <div class="logout" v-if="user.isLogin === true">
        <div class="user">
          <wikiIcon :imgSrc="user.iconUrl" />
          <Title class="userName" :title="user.name" />
        </div>
        <div class="btn" @click="_signOut">
          ログアウト
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import wikiIcon from "../atoms/wikiIcon";
import Title from "../atoms/Title";

export default {
  components: {
    wikiIcon,
    Title,
  },
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
.container {
  padding: 0 15px 0 5px;
}

.btn {
  width: 60px;
  padding: 10px;
  border-radius: 3px;
}

.btn:hover {
  background-color: rgb(246, 246, 244);
  cursor: pointer;
}

.logout {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user {
  display: flex;
}

.userName {
  display: flex;
  align-items: center;
}
</style>
