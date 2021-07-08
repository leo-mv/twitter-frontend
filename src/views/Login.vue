<template>
  <div class="form_container">

    <router-link to="/" class="close">&times;</router-link>

    <div class="login_form">
      <div class="login_title">Log in to Twitter</div>

      <form @submit.prevent="handlerLogin()">
        
        <div class="form_control">
          <div class="form_control_title">Login</div>
          <input type="text" v-model="$v.login.$model" @input="resetServerMessage">
          <span class="error" v-if="$v.login.$dirty && !$v.login.required">The field must not be empty</span>
        </div>

        <div class="form_control">
          <div class="form_control_title">Password</div>
          <input type="password" v-model="$v.password.$model" @input="resetServerMessage">
          <span class="error" v-if="$v.password.$dirty && !$v.password.required">The field must not be empty</span>
        </div>

        <div class="serverMessage" v-if="serverMessage">{{serverMessage}}</div>

        <button class="btn">Login</button>
      </form>
    </div>

  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  data() {
    return {
      login: null,
      password: null,
      serverMessage: null
    }
  },
  methods: {
    resetServerMessage() {
      this.serverMessage = null
    },
    handlerLogin() {
      this.$v.$touch()
      if(this.$v.$error) return

      const data = {
        login: this.login,
        password: this.password
      }


      axios
        .post('login', data)
        .then(response => {
          this.$store.dispatch('auth/saveToken', response.data.token)
          this.$router.push(this.login)
        })
        .catch(err => this.serverMessage = err.response.data.message)

    }
  },
  validations: {
    login: {
      required
    },
    password: {
      required
    }
  }
}
</script>