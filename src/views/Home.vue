<template>
  <div>
    <div class="container">
      <h1>New Tweets</h1>
      <div class="tweets">
        <div 
          class="tweet" 
          v-for="tweet in tweets" 
          :key="tweet.id"
        >
        
          <div class="user_info">
              <router-link :to="tweet.user.login" class="user_name">{{tweet.user.name}}</router-link >
              <router-link :to="tweet.user.login" class="user_login">@{{tweet.user.login}}</router-link >
          </div>
          
          <div class="message">{{tweet.title}}</div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tweets: null
    }
  },
  mounted() {
    axios
      .get()
      .then(response => (this.tweets = response.data))
      .catch(e => console.log(e))
  },
}
</script>
