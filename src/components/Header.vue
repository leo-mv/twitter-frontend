<template>

  <header>
    <div class="container">
      <router-link to="/" class="logo">Twitter</router-link>

      <div class="btn_collection btn_collection_right" v-if="!requaredToken">
        <router-link to="/login" class="btn">Login</router-link>
        <router-link to="/registration"  class="btn">Registration</router-link>
      </div>

      <div class="btn_collection btn_collection_right" v-if="requaredToken">
        <router-link :to="requaredToken.login" class="btn">Profile</router-link>
        <button class="btn" @click="logoutHandler()">Logout</button>
      </div>
    </div>
  </header>

</template>

<script>
export default {
  methods: {
    logoutHandler() {
      this.$store.commit('auth/logout')
      
      const path = '/'
      if (this.$route.path !== path) this.$router.push(path)  
    }
  },
  computed: {
    requaredToken() {
      return this.$store.getters['auth/requaredToken']
    }
  },
}
</script>
