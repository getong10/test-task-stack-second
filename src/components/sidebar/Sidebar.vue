<template>
  <navigation :menu="menu" />
</template>

<script>
import Navigation from '@/components/sidebar/Navigation.vue'

export default {
  name: 'SidebarView',
  components: {
    Navigation,
  },
  data() {
    return {
      menu: [
        {id: 1, name: 'Главная', path: '/'},
        {id: 2, name: 'О проекте', path: '/project'},
      ]
    }
  },
}
</script>

<style>

</style>