<template>
  <div>
    <div @click="changeStatus">
      <span class="edit">編集</span>
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
    ...mapState(["mtMode", "memo", "MTType"]),
  },
  methods: {
    ...mapActions(["findMTFromRepository", "confirmMTType"]),
    ...mapMutations(["changeMordalStatus", "changeMTmode"]),
    changeStatus() {
      console.log(this.mtId, this.MTType);
      this.confirmMTType(this.mtId);
      const type = this.MTType;
      console.log(this.mtId, this.MTType);
      this.findMTFromRepository({
        id: this.mtId,
        type: type,
      });
      const payload = {
        // type: this.mtMode.type,
        type: type,
        method: "update",
        submitButtonText: `${type}を更新する`,
      };
      this.changeMTmode(payload);
      this.changeMordalStatus();
    },
  },
};
</script>

<style lang="scss" scoped>
.edit {
  display: inline-block;
  padding: 3px 8px;
  background-color: rgb(240, 241, 241);
  color: #000;
  border-radius: 3px;
}
</style>
