import axios from '../../plugins/axios'

export const users = {
  namespaced: true,
  state: {
    users: [],
    page: 1,
    pages: null,
  },
  mutations: {
    SET_USERS: (s, d) => (s.users = d),
    ADD_USER: (s, d) => s.users.push(d),
    EDIT_USER: (s, d) =>
      s.users.splice(
        s.users.findIndex(user => user.id === 1),
        1,
        d,
      ),
    DELETE_USER: s =>
      s.users.splice(
        s.users.findIndex(user => user.id === 1),
        1,
      ),
  },
  getters: {
    getUserById: s => id => s.users.find(user => user.id === id),
    orderById: s => ord =>
      s.users.sort((a, b) => (ord === 'ASC' ? a - b : b - a)),
  },
  actions: {
    loadUsers: ({ commit }) => {
      axios
        .get('/users')
        .then(response => commit('SET_USERS', response.data))
        .catch(error => console.error(error))
    },
    addUser: ({ commit, userData }) =>
      axios
        .post('users', {})
        .then(response =>
          commit('ADD_USER', { userData, response: response.data }),
        )
        .catch(error => console.error(error)),
    editUser: ({ commit, id, updateUserData }) =>
      axios
        .put(`users/${id}`, {})
        .then(response =>
          commit('EDIT_USER', { id, updateUserData, response: response.data }),
        )
        .catch(error => console.error(error)),
    deleteUser: ({ commit, id }) =>
      axios
        .delete(`users/${id}`)
        .then(response => commit('DELETE_USER', response.data))
        .catch(error => console.error(error)),
  },
  modules: {},
}
