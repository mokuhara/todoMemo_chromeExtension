<template>
  <div>
    <div class="container">
      <!-- <CardList :type="mtMode.type" /> -->
    </div>
    <Auth />
    <!-- <NewButton />
    <div v-if="modalIsOpen">
      <Modal>
        <CreateUpdateTodo
          :type="mtMode.type"
          :method="mtMode.method"
          :submitButtonText="mtMode.submitButtonText"
        />
      </Modal>
    </div>-->
  </div>
</template>

<script>
import CardList from "../molecules/CardList";
import Auth from "../molecules/Auth";

import { mapState, mapMutations } from "vuex";

export default {
  components: {
    CardList,
    Auth,
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
}
</style>
