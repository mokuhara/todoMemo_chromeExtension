<template>
  <div></div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      icon: "",
      url: "",
      title: "",
    };
  },
  mounted() {
    chrome.tabs.getSelected((tab) => {
      // 現在のタブを取得
      this.title = tab.title; // tabに現在のタブが格納されている（？）。
      this.url = tab.url; // tab.titleには現在開いているタブのページタイトルが、tab.urlにはURLが格納されている。
      console.log(tab);
    });
  },
};
</script>

<style scoped></style>
