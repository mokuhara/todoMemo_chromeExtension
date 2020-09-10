<template>
  <div>
    <div>
      <span :class="DateLabel.class" class="label">{{ DateLabel.text }}</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    dateRange: Object,
  },
  computed: {
    DateLabel() {
      const format = "YYYY年MM月DD日";
      if (new Date() <= new Date(this.dateRange.start)) {
        return {
          text: `開始予定:${moment(new Date(this.dateRange.start)).format(
            format
          )}`,
          class: "feature",
        };
      } else if (new Date() >= new Date(this.dateRange.end)) {
        return { text: "期限切れ", class: "past" };
      } else {
        return { text: "期間中", class: "withinAPeriod" };
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  padding: 1px 3px;
  border-radius: 3px;
  font-size: 4px;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  text-align: center;
}

.feature {
  background-color: rgb(240, 241, 241);
}

.past {
  background-color: rgba(196, 47, 38, 0.7);
  color: #fff;
}

.withinAPeriod {
  background-color: rgba(43, 171, 159, 0.7);
  color: #fff;
}
</style>
