<template>
  <div>
    <div @click="_deleteMT">
      <span class="delete">削除</span>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  props: {
    mtId: String,
  },
  computed: {
    ...mapState(["mtMode"]),
  },
  methods: {
    ...mapActions(["deleteMT"]),
    _deleteMT() {
      const payload = {
        type: this.mtMode.type,
        id: this.mtId,
      };
      this.deleteMT(payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.delete {
  display: inline-block;
  padding: 3px 8px;
  background-color: rgb(196, 47, 38);
  color: #fff;
  border-radius: 3px;
}
</style>
