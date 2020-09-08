<template>
  <div>
    <div class="container">
      <div class="leftWrapper">
        <div>
          <Icon :href="pageUrl" :imgSrc="favIconUrl" />
        </div>
        <div>
          <InputCheck :type="type" :checked="done" />
        </div>
      </div>
      <div class="rightWrapper">
        <div class="topWrapper">
          <div>
            <Title :title="pageTitle" />
          </div>
          <div>
            <Text :text="updated_at" />
          </div>
          <div>
            <!-- datelabel  -->
          </div>
        </div>
        <div class="bottomWrapper">
          <Text :text="text" />
        </div>
        <div>
          <!-- tag -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputCheck from "../molecules/InputCheck";
import Title from "../atoms/Title";
import Text from "../atoms/Title";
import Icon from "../atoms/Icon";

export default {
  data() {
    return {
      type: "todo",
    };
  },
  components: {
    InputCheck,
    Title,
    Text,
    Icon,
  },
  props: {
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
