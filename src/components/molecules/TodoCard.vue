<template>
  <div>
    <div class="container">
      <div class="leftWrapper">
        <div class="iconWrapper">
          <Icon :href="pageUrl" :imgSrc="favIconUrl" />
        </div>
        <div class="checkWrapper">
          <InputCheck :checked="done" :callBack="sendInputCheckData" />
        </div>
      </div>
      <div class="rightWrapper">
        <div class="topWrapper">
          <div class="dateWrapper">
            <MText class="updatedAt" :mtext="formatDate" />
            <DateLabel :dateRange="dateRange" />
          </div>
          <div>
            <Title :title="pageTitle" />
          </div>
        </div>
        <div class="bottomWrapper">
          <!-- <MText :mtext="text" /> -->
          <MarkdownText :mtext="text" />
        </div>
        <div>
          <TagList :tags="tags" />
        </div>
        <div class="btnWrapper">
          <div class="btn"><EditButton :mtId="id" /></div>
          <div class="btn"><DeleteButton :mtId="id" /></div>
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
import EditButton from "../molecules/EditButton";
import DeleteButton from "../molecules/DeleteButton";
import DateLabel from "../atoms/DateLavel";
import MarkdownText from "../molecules/MarkdownText";

import moment from "moment";

import { mapActions } from "vuex";

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
    EditButton,
    DeleteButton,
    DateLabel,
    MarkdownText,
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
  computed: {
    formatDate() {
      const format = "YYYY年MM月DD日";
      return moment(new Date(this.updated_at)).format(format);
    },
  },
  methods: {
    ...mapActions(["findMTFromRepository", "pushMT"]),
    sendInputCheckData() {
      this.findMTFromRepository({
        id: this.id,
        type: this.type,
        dtype: "done",
        data: !this.done,
        changeValue: true,
      });
      this.pushMT({ type: "todo", method: "update" });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-top: 5px;
}

.rightWrapper {
  width: 100%;
}

.btnWrapper {
  display: flex;
  margin: 5px;
  justify-content: flex-end;
}

.dateWrapper {
  display: flex;
}

.updatedAt {
  font-size: 8px;
  color: rgba(0, 0, 0, 0.5);
  margin-right: 5px;
}

.iconWrapper {
  margin: 10px;
}

.checkWrapper {
  margin-left: 20px;
}

.btn {
  margin: 5px;
}
</style>
