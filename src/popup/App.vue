<template>
  <div id="app">
    <div id="nav">
      <router-link to="/memo">Memo</router-link>
      <router-link to="/todo">Todo</router-link>
      <router-link to="/Search">Search</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
html {
  width: 400px;
  height: 800px;
}
</style>
