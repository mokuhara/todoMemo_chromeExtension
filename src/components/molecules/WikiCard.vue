<template>
  <div>
    <div class="container">
      <div class="leftWrapper">
        <div class="iconWrapper">
          <Icon :href="pageUrl" :imgSrc="favIconUrl" />
        </div>
      </div>
      <div class="rightWrapper">
        <div>
          <MText class="updatedAt" :mtext="updated_at" />
          <Title :title="pageTitle" />
        </div>
        <div>
          <MarkdownText :mtext="text" />
        </div>
        <div>
          <TagList :tags="tags" />
        </div>
        <div class="btnWrapper">
          <div class="auth">
            <WikiIcon :imgSrc="userIconUrl" />
            <MText class="authName" :mtext="userName" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../atoms/Title";
import MText from "../atoms/Text";
import Icon from "../atoms/Icon";
import TagList from "../atoms/TagList";
import MarkdownText from "../molecules/MarkdownText";
import WikiIcon from "../atoms/wikiIcon";

export default {
  data() {
    return {
      type: "memo",
      path: "#",
    };
  },
  components: {
    Icon,
    Title,
    MText,
    TagList,
    MarkdownText,
    WikiIcon,
  },
  props: {
    id: String,
    text: String,
    updated_at: String,
    pageUrl: String,
    pageTitle: String,
    favIconUrl: String,
    tags: Array,
    userName: String,
    userIconUrl: String,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.updatedAt {
  font-size: 8px;
  color: rgba(0, 0, 0, 0.5);
}

.iconWrapper {
  margin: 10px;
}

.btnWrapper {
  display: flex;
  margin: 5px;
  justify-content: flex-end;
}

.rightWrapper {
  width: 100%;
}

.btn {
  margin: 5px;
}

.auth {
  display: flex;
}

.authName {
  display: flex;
  align-items: center;
}
</style>
