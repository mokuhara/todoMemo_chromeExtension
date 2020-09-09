<template>
  <div>
    <div class="btn" @click="changeStatus">
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
    ...mapMutations(["changeMordalStatus", "changeMTmode"]),
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

<style lang="scss" scoped>
.btn {
  position: fixed;
  bottom: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background-color: #000;
  color: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 50%;
  font-size: 16px;
  font-weight: bold;
}
</style>
