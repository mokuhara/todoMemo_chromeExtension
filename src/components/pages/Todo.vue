<template>
  <div>
    todo
    <Tag />
    <InputText />
    <Calender />
    <Icon />
  </div>
</template>

<script>
import Tag from "../molecules/Tag";
import InputText from "../molecules/InputText";
import Calender from "../molecules/Calender";
import Icon from "../molecules/Icon";

export default {
  components: {
    Tag,
    InputText,
    Calender,
    Icon,
  },
};
</script>

<style lang="scss" scoped></style>
