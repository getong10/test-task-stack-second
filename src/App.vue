<template>
  <MainLayout v-if="this.isAuth" />
  <login-page v-else />
</template>

<script>
import MainLayout from './layouts/MainLayout.vue'
import MixinAuth from './mixins/AuthMixin';
import LoginPage from './pages/LoginPage.vue';

export default {
  name: 'App',
  components: {
    MainLayout,
    LoginPage
  },
  mixins: [MixinAuth],
}
</script>

<style>
html, body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
