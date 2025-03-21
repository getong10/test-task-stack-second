<template>
  <div id="sidebar_container">
    <div id="sidebar_user">
      {{ `Привет, ${user}!` }}
    </div>

    <div id="sidebar_navigation">
      <navigation :menu="menu" />
    </div>

    <div id="sidebar_footer">
      <base-button :id="'logout_button'" @click="handleLogout">Выйти</base-button>
    </div>
  </div>
</template>

<script>
import Navigation from '@/components/sidebar/Navigation.vue'
import BaseButton from '../ui/BaseButton.vue';
import { authState } from '@/mixins/AuthMixin';
import AuthMixin from '@/mixins/AuthMixin';

export default {
  name: 'SidebarView',
  components: {
    Navigation,
    BaseButton,
  },
  mixins: [AuthMixin],
  data() {
    return {
      user: authState.currentUser.login,
      menu: [
        {id: 1, name: 'Главная', path: '/'},
        {id: 2, name: 'О проекте', path: '/project'},
      ]
    }
  },
  methods: {
    handleLogout() {
      this.logout();
    }
  }
}
</script>

<style>
#sidebar_container {
  display: flex;
  flex-direction: column;
  width: 250px;
  height: 100%;
  background-color: #ffffff;
}

#sidebar_user {
  padding: 20px;
  font-size: 24px;
  font-weight: 600;
  border-bottom: 1px solid #e2e2e2;
}

#sidebar_footer {
  margin-top: auto;
  padding: 20px;
}
</style>