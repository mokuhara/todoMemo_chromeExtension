<template>
  <div>
    <div>
      <div>
        <Icon />
      </div>
      <div>
        <Title />
        <Text />
      </div>
    </div>
  </div>
</template>

<script>
import Icon from "../atoms/Icon";
import Title from "../atoms/Title";
import Text from "../atoms/Text";

export default {
  components: {
    Icon,
    Title,
    Text,
  },
};
</script>

<style lang="scss" scoped>
</style>