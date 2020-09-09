<template>
  <div>
    <div class="container">
      <div class="leftWrapper">
        <div>
          <Icon :href="pageUrl" :imgSrc="favIconUrl" />
        </div>
        <div>
          <InputCheck :type="type" :checked="done" :dataId="id" />
        </div>
      </div>
      <div class="rightWrapper">
        <div class="topWrapper">
          <div>
            <Title :title="pageTitle" />
          </div>
          <div>
            <MText :mtext="updated_at" />
          </div>
          <div>
            <!-- datelabel  -->
          </div>
        </div>
        <div class="bottomWrapper">
          <MText :mtext="text" />
        </div>
        <div>
          <TagList :tags="tags" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputCheck from "../molecules/InputCheck";
import Title from "../atoms/Title";
import MText from "../atoms/Text";
import Icon from "../atoms/Icon";
import TagList from "../atoms/TagList";

export default {
  data() {
    return {
      type: "todo",
    };
  },
  components: {
    InputCheck,
    Title,
    MText,
    Icon,
    TagList,
  },
  props: {
    id: String,
    text: String,
    updated_at: String,
    pageUrl: String,
    pageTitle: String,
    favIconUrl: String,
    tags: Array,
    done: Boolean,
    dateRange: Object,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}

.topWrapper {
  display: flex;
}
</style>
