export default {
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push({ path: '/login' });
      this.isAuth = false;
    },

    login(user) {
      this.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
      this.$router.push({ path: '/' });
      this.isAuth = true;
    },

    checkAuth() {
      return this.isAuth
    }
  },
  
  data() {
    return {
      isAuth: false,
      currentUser: null
    }
  },
}