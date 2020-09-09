<template>
  <div>
    <div class="container">
      <div class="text">実施期間</div>
      <v-date-picker :mode="mode" v-model="selectedDate"></v-date-picker>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

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
  computed: {
    ...mapState(["todo", "memo", "mtMode"]),
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
  mounted() {
    if (this.mtMode.method === "update")
      if (this.type === "memo") {
        const dataRage = {
          start: new Date(this.memo.dateRange.start),
          end: new Date(this.memo.dateRange.end),
        };
        this.selectedDate = dataRage;
      } else if (this.type === "todo") {
        const dataRage = {
          start: new Date(this.todo.dateRange.start),
          end: new Date(this.todo.dateRange.end),
        };
        this.selectedDate = dataRage;
      }
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 250px;
  margin: 0 atuo;
}

.text {
  color: rgba(0, 0, 0, 0.5);
}
</style>
