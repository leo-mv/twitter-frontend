import axios from 'axios'

const auth = {
  state: {
    accessToken: false
  },

  mutations: {
    logout(state) {
      localStorage.removeItem('token')
      state.accessToken = false
    }
  },

  getters: {
    requaredToken(state) {
      return state.accessToken
    }
  },

  actions: {
    async requaredToken({ state }) {
      const token = localStorage.getItem('token')
      if(token) {
        await axios
          .get('login/verify', {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          })
          .then(response => state.accessToken = response.data)
          .catch(err => console.log(err))
      } else {
        state.accessToken = false
      }
    },
    saveToken(context, payload) {
      localStorage.setItem('token', payload)
    },
  },
  namespaced: true
}

export default auth