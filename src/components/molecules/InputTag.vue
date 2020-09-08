<template>
  <div>
    <div>
      <label class="typo__label">Tagging</label>
      <Multiselect
        v-model="taggingSelected"
        :options="taggingOptions"
        :multiple="true"
        :taggable="true"
        label="name"
        track-by="code"
        @tag="addTag"
        @remove="removeTag"
        tag-placeholder="Add this as new tag"
        placeholder="Type to search or add tag"
      >
      </Multiselect>
      <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

import { mapMutations } from "vuex";
export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      taggingOptions: [],
      taggingSelected: [],
    };
  },
  props: {
    type: String,
  },
  methods: {
    ...mapMutations(["storeMTToState"]),
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.taggingOptions.push(tag);
      this.taggingSelected.push(tag);
      this.storeMTToState({
        type: this.type,
        dtype: "tags",
        data: this.taggingSelected,
      });
    },
    removeTag(removeTag) {
      const removedTags = this.taggingSelected.filter((tag) => {
        return tag.code !== removeTag.code;
      });
      this.taggingSelected = removedTags;
      this.storeMTToState({
        type: this.type,
        dtype: "tags",
        data: removedTags,
      });
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
