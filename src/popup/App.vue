<template>
  <div id="app">
    <div class="header">
      <MTHeader />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import MTHeader from "../components/molecules/Header";

export default {
  name: "App",
  components: { MTHeader },
};
</script>

<style>
html {
  width: 400px;
  height: 100%;
  min-height: 200px;
}

body {
  border-radius: 5px;
}
</style>
