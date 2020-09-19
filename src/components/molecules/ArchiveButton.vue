<template>
  <div>
    <div @click="sendInputArchiveData">
      <span v-if="!isArchive" class="archive">↑</span>
      <span v-if="isArchive" class="archive">↓</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  props: {
    mtId: String,
    isArchive: Boolean,
  },
  methods: {
    ...mapActions(["findMTFromRepository", "pushMT"]),
    sendInputArchiveData() {
      this.findMTFromRepository({
        id: this.mtId,
        type: "memo",
        dtype: "isArchive",
        data: !this.isArchive,
        changeValue: true,
      });
      this.pushMT({ type: "memo", method: "update" });
    },
  },
};
</script>

<style lang="scss" scoped>
.archive {
  display: inline-block;
  padding: 3px 8px;
  background-color: rgb(240, 241, 241);
  border-radius: 3px;
}
</style>
