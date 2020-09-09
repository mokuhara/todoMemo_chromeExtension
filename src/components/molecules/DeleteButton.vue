<template>
  <div>
    <div @click="_deleteMT">
      削除
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

<style lang="scss" scoped></style>
