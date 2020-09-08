<template>
  <div>
    <div class="container">
      <div>
        <img :src="favIcon" />
      </div>
      <div>
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      favIcon: "",
      url: "",
      title: "",
    };
  },
  props: {
    type: String,
  },
  methods: {
    ...mapMutations(["storeMTToState"]),
  },
  mounted() {
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
  },
};
</script>

<style scoped>
.container {
  display: flex;
}
</style>
