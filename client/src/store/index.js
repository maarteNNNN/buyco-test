import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    page: 1,
  },
  mutations: {
    addUser(user) {
      return new Promise((resolve, reject) => {
        Vue.$http
          .post('users', { user })
          .then(response => resolve(response))
          .catch(e => reject(e))
      })
    },
    editUser(id, updatedUser) {
      return new Promise((resolve, reject) => {
        Vue.$http
          .put(`users/${id}`, { updatedUser })
          .then(response => resolve(response))
          .catch(e => reject(e))
      })
    },
    deleteUser(id) {
      return new Promise((resolve, reject) => {
        Vue.$http
          .delete(`users/${id}`)
          .then(response => resolve(response))
          .catch(e => reject(e))
      })
    },
  },
  getters: {
    getUserById: s => id => s.users.find(user => user.id === id),
  },
  actions: {},
  modules: {},
})
