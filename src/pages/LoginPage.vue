<template>
  <div id="login_page_container">
    <form-view>
      <template v-slot:form_header>Форма авторизации</template>

      <template v-slot:form_content>
        <base-input v-model="credentials.login" :id="'login_input'" :placeholder="'Логин'"></base-input>
        <base-input v-model="credentials.password" :id="'login_input'" :type="'password'" :placeholder="'Пароль'"></base-input>
        <base-button :id="'login_button'" @click="handleLogin">Войти</base-button>
      </template>
    </form-view>
  </div>
</template>

<script>
import FormView from '@/views/FormView.vue'
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import MixinAuth from '@/mixins/AuthMixin';

export default {
  name: 'LoginPage',
  components: {
    FormView,
    BaseButton,
    BaseInput,
  },
  mixins: [MixinAuth],
  data() {
    return {
      credentials: {
        login: '',
        password: '',
      }
    }
  },
  methods: {
    handleLogin() {
      if (this.credentials.login && this.credentials.password) {
        this.login(this.credentials)
      }
    }
  },
}
</script>

<style>
#login_page_container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>