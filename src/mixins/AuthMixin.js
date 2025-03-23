import Vue from 'vue';

export const authState = Vue.observable({
  isAuth: !!localStorage.getItem('user'),
  currentUser: JSON.parse(localStorage.getItem('user')) || null
});

export default {
  methods: {
    logout() {
      localStorage.removeItem('user');
      authState.isAuth = false;
      authState.currentUser = null;
      this.$router.push('/login');
    },

    login(user) {
      localStorage.setItem('user', JSON.stringify(user));
      authState.isAuth = true;
      authState.currentUser = user;
      this.$router.push('/');
    },
  },
  
  computed: {
    isAuth() {
      return authState.isAuth;
    },

    currentUser() {
      return authState.currentUser;
    },
  }
}