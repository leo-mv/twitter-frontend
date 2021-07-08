<template>
  <div class="form_container">

    <router-link to="/" class="close">&times;</router-link>

    <div class="login_form">
      <div class="login_title">Create your account</div>

      <form @submit.prevent="registration()">

        <div class="form_control">
          <div class="form_control_title">Login</div>
          <input type="text" v-model.trim="$v.login.$model" @input="requiredLogin">
          <span class="error" v-if="!$v.login.minLength">Login must have at least 4 letters.</span>
          <span class="error" v-if="$v.login.$dirty && !$v.login.required">The field must not be empty</span>

          <span class="error" v-if="serverMessage">{{serverMessage}}</span>
          <span class="message" v-if="serverMessage && !repeatLogin">{{serverMessage}}</span>
        </div>

        <div class="form_control">
          <div class="form_control_title">Name</div>
          <input type="text" v-model="$v.name.$model">
          <span class="error" v-if="!$v.name.minLength">Login must have at least 4 letters.</span>
          <span class="error" v-if="$v.name.$dirty && !$v.name.required">The field must not be empty</span>
        </div>

        <div class="form_control">
          <div class="form_control_title">Password</div>
          <input type="password" v-model.trim="$v.password.$model">
          <span class="error" v-if="!$v.password.minLength">Login must have at least 6 letters.</span>
          <span class="error" v-if="$v.password.$dirty && !$v.password.required">The field must not be empty</span>
        </div>

        <div class="form_control">
          <div class="form_control_title">Repeat password</div>
          <input type="password" v-model.trim="$v.repeatPassword.$model">
          <span class="error" v-if="$v.repeatPassword.$dirty && !$v.repeatPassword.sameAsPassword">Passwords must be identical</span>
        </div>

        <button class="btn">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  data() {
    return {
      login: null,
      name: null,
      password: null,
      repeatPassword: null,
      serverMessage: null,
      repeatLogin: false
    }
  },
  methods: {
    requiredLogin() {
      if (this.$v.login.minLength && this.$v.login.required) {

        const data = {
          login: this.login,
        }

        axios
          .post('registration/requared_login', data)
          .then(response => {
            this.serverMessage = 'Login is free'
            this.repeatLogin = false
          })
          .catch(err => {
            this.serverMessage = err.response.data.message
            this.repeatLogin = true
          })
      } else {
        this.serverMessage = null
        this.repeatLogin = false
      }
      
    },
    registration() {
      this.$v.$touch()
      if(this.$v.$error || this.repeatLogin) return

      const data = {
        login: this.login,
        name: this.name,
        password: this.password
      }

      axios
        .post('registration', data)
        .then(response => {
          this.$router.push('/login')
        })
        .catch(err => this.serverMessage = err.response.data.message)

    }
  },
  validations: {
    login: {
      required,
      minLength: minLength(4)
    },
    name: {
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  }
}
</script>