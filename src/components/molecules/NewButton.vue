<template>
  <div>
    <div @click="changeStatus">
      ＋
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  methods: {
    ...mapMutations(["changeMordalStatus"]),
    changeStatus() {
      this.changeMordalStatus();
    },
  },
};
</script>

<style lang="scss" scoped></style>
