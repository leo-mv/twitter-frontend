<template>

  <div class="container">
    <div class="user_header" v-if="userData">
      <a href="#" class="user_img">
        <img src="" alt="">
      </a>
      <div class="user_info">
          <div class="user_name">{{userData.user.name}}</div>
          <div class="user_login">@{{userData.user.login}}</div>
      </div>
    </div>

    <div class="add_new_tweet" v-if="isAdminPage">

      <form @submit.prevent="addTweet()">
        <textarea v-model="tweet"></textarea>
        <button class="btn">Добавить</button>
      </form>

    </div>

    <div class="tweets" v-if="userData">
      <div 
        class="tweet" 
        v-for="tweet in userData.tweets"
        :key="tweet.id"
      >
        <div class="user_info">
            <router-link :to="userData.user.login" class="user_name">{{userData.user.name}}</router-link>
            <router-link :to="userData.user.login" class="user_login">@{{userData.user.login}}</router-link>
        </div>
        <div class="message">{{tweet.title}}</div>
      </div>
    </div>

  </div>
  
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      userId: null,
      userData: null,
      tweet: null
    }
  },
  computed: {
    isAdminPage() {
      return this.userId === this.$store.getters['auth/requaredToken']._id
    }
  },
  methods: {
    loadData() {
      if (this.$route.path != '/404') {
        axios
          .get(this.$route.path)
          .then(response => {
            this.userData = response.data
            this.userId = response.data.user._id
          })
          .catch(e => {
            this.$router.push('404')
            console.log(e)
          })
      }
    },
    addTweet() {
      if(this.tweet) {

        const data = {
          title: this.tweet
        }

        axios
          .post(this.$route.path, data, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
          })
          .then(response => {
            this.tweet = null
            this.loadData()
          })
          .catch(e => console.log(e))
      }
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      handler() {this.loadData()}
    },
  }
}
</script>