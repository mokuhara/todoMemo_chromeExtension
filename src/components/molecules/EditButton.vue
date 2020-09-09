<template>
  <div>
    <div @click="changeStatus">
      編集
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
    ...mapActions(["findMTFromRepository"]),
    ...mapMutations(["changeMordalStatus", "changeMTmode"]),
    changeStatus() {
      console.log(this.mtId);
      console.log(this.mtMode.type);
      this.findMTFromRepository({
        id: this.mtId,
        type: this.mtMode.type,
      });
      this.changeMordalStatus();

      const payload = {
        type: this.mtMode.type,
        method: "update",
        submitButtonText: `${this.mtMode.type}を更新する`,
      };
      this.changeMTmode(payload);
    },
  },
};
</script>

<style lang="scss" scoped></style>
