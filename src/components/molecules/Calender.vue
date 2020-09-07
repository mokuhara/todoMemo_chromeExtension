<template>
  <div>
    <v-date-picker :mode="mode" v-model="selectedDate"></v-date-picker>
    {{ selectedDate }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: "",
      mode: "range",
    };
  },
};
</script>

<style lang="scss" scoped></style>
