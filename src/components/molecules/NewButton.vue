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
  computed: {
    ...mapState(["mtMode"]),
  },
  methods: {
    ...mapMutations(["changeMordalStatus","changeMTmode"]),
    changeStatus() {
      const payload = {
        type: this.mtMode.type,
        method: "create",
        submitButtonText: `${this.mtMode.type}をつくる`,
      };
      this.changeMTmode(payload);

      this.changeMordalStatus();
    },
  },
};
</script>

<style lang="scss" scoped></style>
