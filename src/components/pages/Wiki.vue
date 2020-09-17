<template>
  <div>
    <div class="container">
      <!-- <CardList :type="mtMode.type" /> -->
    </div>
    <Auth />
    {{  wikiMemoCards }}
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
// import CardList from "../molecules/CardList";
import Auth from "../molecules/Auth";

import { mapActions, mapState } from "vuex"

export default {
  components: {
    // CardList,
    Auth,
  },
  computed: {
    ...mapState(["wikiMemoCards"])
  },
  methods: {
    ...mapActions(["wikiHandler"]),
  },
  mounted(){
    const payload = {
        method: "get"
      }
      this.wikiHandler(payload);
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
}
</style>



<style lang="scss" scoped>