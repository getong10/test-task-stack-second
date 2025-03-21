<template>
  <div id="navigation_container">
    <router-link 
      v-for="item in menu" 
      :key="item.id"
      :to="item.path"
      class="menu_item"
      :class="{ 'active': $route.path === item.path }"
    >
      {{ item.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavigationComponent',
  data() {
    return {}
  },
  props: {
    menu: Array
  }
}
</script>

<style>
#navigation_container {
  width: 250px;
  background-color: #ffffff;
  padding: 20px;
}

.menu_item {
  display: block;
  padding: 12px 15px;
  margin-bottom: 8px;
  text-decoration: none;
  color: #333;
  border-radius: 6px;
}

.menu_item:hover {
  background-color: #e0e0e0;
}

.menu_item.active {
  background-color: #1976d2;
  color: #ffffff;
}
</style>