<template>
  <div>
    <div>
      <div class="exp">
        <div class="checkbox">
          <form>
            <div>
              <input
                type="checkbox"
                v-model="done"
                @click="sendData"
                :checked="checked"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      done: this.checked,
    };
  },
  props: {
    checked: Boolean,
    type: String,
    dataId: String,
  },
  methods: {
    ...mapActions(["findMTFromRepository", "pushMT"]),
    ...mapMutations(["storeMTToState"]),
    sendData(e) {
      this.findMTFromRepository({
        id: this.dataId,
        type: this.type,
        dtype: "done",
        data: !this.done,
      });
      this.pushMT({ type: "todo", method: "update" });
    },
  },
};
</script>
<style lang="scss" scoped></style>
