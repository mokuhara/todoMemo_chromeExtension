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
                @click="callBack"
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
export default {
  data() {
    return {
      done: this.checked,
    };
  },
  props: {
    checked: Boolean,
    callBack: Function,
    type: String,
  },
  watch: {
    checked(value) {
      this.done = value;
    },
  },
};
</script>
<style lang="scss" scoped></style>
