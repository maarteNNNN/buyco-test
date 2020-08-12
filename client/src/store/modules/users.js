import axios from '../../plugins/axios'

export const users = {
  namespaced: true,
  state: {
    users: [],
    page: 1,
    pages: null,
    itemsPerPage: 10,
    shownUsers: [],
  },
  mutations: {
    SET_USERS: (s, d) => {
      s.users = d
      s.shownUsers = d.slice(0, s.itemsPerPage)
    },
    SET_PAGES: (s, d) => (s.pages = d.length / 10),
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
    CHANGE_PAGE: (s, c) => {
      s.page + c >= 1 && s.page + c <= s.pages && (s.page += c)
      s.shownUsers = s.users.slice(
        s.page * s.itemsPerPage,
        s.page * s.itemsPerPage + s.itemsPerPage,
      )
    },
  },
  getters: {
    getUsersByPage: s =>
      s.users.slice(
        s.currentIndex * s.page,
        s.currentIndex * s.page + s.itemsPerPage,
      ),
    getUserById: s => id => s.users.find(user => user.id === id),
    orderById: s => ord =>
      s.users.sort((a, b) => (ord === 'ASC' ? a - b : b - a)),
  },
  actions: {
    loadUsers: ({ commit }) => {
      axios
        .get('/users')
        .then(response => {
          commit('SET_USERS', response.data)
          commit('SET_PAGES', response.data)
        })
        .catch(error => console.error(error))
    },
    addUser: ({ commit }, userData) =>
      axios
        .post('users', {})
        .then(response =>
          commit('ADD_USER', { userData, response: response.data }),
        )
        .catch(error => console.error(error)),
    editUser: ({ commit }, id, updateUserData) =>
      axios
        .put(`users/${id}`, {})
        .then(response =>
          commit('EDIT_USER', { id, updateUserData, response: response.data }),
        )
        .catch(error => console.error(error)),
    deleteUser: ({ commit }, id) =>
      axios
        .delete(`users/${id}`)
        .then(response => commit('DELETE_USER', response.data))
        .catch(error => console.error(error)),
    changePage: ({ commit }, change) => commit('CHANGE_PAGE', change),
  },
  modules: {},
}
