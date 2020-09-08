<template>
  <div>
    <div class="container">
      <v-date-picker :mode="mode" v-model="selectedDate"></v-date-picker>
    </div>
    {{ selectedDate }}
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      selectedDate: "",
      mode: "range",
    };
  },
  props: {
    type: String,
  },
  methods: {
    ...mapMutations(["storeMTToState"]),
  },
  watch: {
    selectedDate: function(val) {
      this.storeMTToState({
        type: this.type,
        dtype: "dateRange",
        data: { start: this.selectedDate.start, end: this.selectedDate.end },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 200px;
}
</style>
