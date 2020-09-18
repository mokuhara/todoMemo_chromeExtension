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
        </div>
        <div>
          <InputSearch
            :submitButtonText="submitButtonText"
            :inputPlaceholder="inputPlaceholder"
            :callback="serchWiki"
          />
        </div>
        <div class="btn" @click="_signOut">
          ログアウト
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import wikiIcon from "../atoms/wikiIcon";
import InputSearch from "../molecules/InputSearch";

export default {
  data() {
    return {
      submitButtonText: "検索する",
      inputPlaceholder: "キーワードを入力",
    };
  },
  components: {
    wikiIcon,
    InputSearch,
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["signIn", "signOut", "wikiHandler"]),
    ...mapMutations(["setSearchKeyword"]),
    _signIn() {
      this.signIn();
    },
    _signOut() {
      this.signOut();
    },
    serchWiki(text) {
      if (text) {
        const payload = {
          method: "find",
        };
        this.setSearchKeyword(text);
        this.wikiHandler(payload);
      } else {
        const payload = {
          method: "get",
        };
        this.wikiHandler(payload);
      }
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
  padding: 5px;
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
