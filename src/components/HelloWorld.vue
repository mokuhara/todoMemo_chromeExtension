<template>
  <div>
    <p>{{ defaultText }}</p>
    <p>hogehogefugafuga</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      hoge: "hoge",
    };
  },
  mounted() {
    browser.runtime.sendMessage({});
    let Data = { Title: "", URL: "" }; // とりま格納する変数

    chrome.tabs.getSelected((tab) => {
      // 現在のタブを取得
      Data.Title = tab.title; // tabに現在のタブが格納されている（？）。
      Data.URL = tab.url; // tab.titleには現在開いているタブのページタイトルが、tab.urlにはURLが格納されている。
      console.log(`Title: ${Data.Title}`); // 出力は、「ポップアップを検証」で見れる。
      console.log(`URL: ${Data.URL}`);
      console.log(tab);
    });
  },
  computed: {
    defaultText() {
      return browser.i18n.getMessage("extName");
    },
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
