<template>
  <div id="app">
    <sidebar-view />
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import SidebarView from '@/components/sidebar/Sidebar.vue';

export default {
  name: 'MainLayout',
  components: {
    SidebarView,
  }
}
</script>

<style>
#app {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

#content {
  flex: 1;
  background-color: #ffffff;
  margin: 10px;
  border-radius: 15px;
}
</style>