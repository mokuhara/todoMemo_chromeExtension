<template>
  <div>
    <div class="container">
      <div class="icon">
        <img :src="favIcon" />
      </div>
      <div class="title">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      favIcon: "",
      url: "",
      title: "",
    };
  },
  computed: {
    ...mapState(["todo", "memo", "mtMode"]),
  },
  props: {
    type: String,
  },
  methods: {
    ...mapMutations(["storeMTToState"]),
  },
  mounted() {
    if (this.mtMode.method === "create") {
      chrome.tabs.getSelected((tab) => {
        this.title = tab.title;
        this.url = tab.url;
        this.favIcon = tab.favIconUrl;
        //   console.log(tab);
        this.storeMTToState({
          type: this.type,
          dtype: "favIconUrl",
          data: this.favIcon,
        });
        this.storeMTToState({
          type: this.type,
          dtype: "pageUrl",
          data: this.url,
        });
        this.storeMTToState({
          type: this.type,
          dtype: "pageTitle",
          data: this.title,
        });
      });
    }

    if (this.mtMode.method === "update")
      if (this.type === "memo") {
        this.favIcon = this.memo.favIconUrl;
        this.url = this.memo.pageUrl;
        this.title = this.memo.pageTitle;
      } else if (this.type === "todo") {
        this.favIcon = this.todo.favIconUrl;
        this.url = this.todo.pageUrl;
        this.title = this.todo.pageTitle;
      }
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.icon img {
  width: 40px;
  height: 40px;
  padding: 5px;
  border-radius: 50%;
}

.title {
  display: flex;
  align-items: center;
  font-weight: bold;
}
</style>
