import axios from '../../plugins/axios'

export const users = {
  namespaced: true,
  state: {
    users: [],
    page: 1,
    pages: null,
    itemsPerPage: 10,
    shownUsers: [],
    sorting: {
      id: 'ASC',
      firstName: null,
    },
  },
  mutations: {
    SET_USERS: (s, d) => {
      s.users = d
      s.shownUsers = d.slice(0, s.itemsPerPage)
    },
    SET_PAGES: (s, d) => (s.pages = d.length / s.itemsPerPage),
    ADD_USER: (s, d) => s.users.push(d),
    EDIT_USER: (s, id, d) =>
      s.users.splice(
        s.users.findIndex(user => user.id === id),
        1,
        d,
      ),
    DELETE_USER: (s, id) => {
      s.users.splice(
        s.users.findIndex(user => user.id === id),
        1,
      ),
        (s.shownUsers = s.users.slice(
          s.page === 1 ? 0 : s.page * s.itemsPerPage,
          s.page === 1
            ? s.itemsPerPage
            : s.page * s.itemsPerPage + s.itemsPerPage,
        ))((s.pages = s.users.length / s.itemsPerPage))
    },
    CHANGE_PAGE: (s, c) => {
      s.page + c >= 1 && s.page + c <= s.pages && (s.page += c)
      s.shownUsers = s.users.slice(
        s.page === 1 ? 0 : s.page * s.itemsPerPage,
        s.page === 1
          ? s.itemsPerPage
          : s.page * s.itemsPerPage + s.itemsPerPage,
      )
    },
    // eslint-disable-next-line
    SORT: (s, { key, sorting }) => {
      Object.keys(s.sorting).forEach(key => (s.sorting[key] = null))
      s.sorting[key] = sorting
      s.users = s.users.sort((a, b) => {
        if (typeof a[key] === 'number') {
          return sorting === 'ASC' ? a[key] - b[key] : b[key] - a[key]
        }
        if (a[key] < b[key]) {
          return sorting === 'ASC' ? 1 : -1
        }
        if (a[key] > b[key]) {
          return sorting === 'ASC' ? -1 : 1
        }
        return 0
      })
      s.shownUsers = s.users.slice(
        s.page === 1 ? 0 : s.page * s.itemsPerPage,
        s.page === 1
          ? s.itemsPerPage
          : s.page * s.itemsPerPage + s.itemsPerPage,
      )
    },
  },
  getters: {
    getUserById: s => id => {
      return s.users.find(user => user.id === parseInt(id))
    },
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
        .post('users', userData)
        .then(() => commit('ADD_USER', { id: userData.id, ...userData.body }))
        .catch(error => console.error(error)),
    editUser: ({ commit }, { id, data }) =>
      axios
        .put(`users/${id}`, data)
        .then(() => commit('EDIT_USER', id, data))
        .catch(error => console.error(error)),
    deleteUser: ({ commit }, id) =>
      axios
        .delete(`users/${id}`)
        .then(() => commit('DELETE_USER', id))
        .catch(error => console.error(error)),
    changePage: ({ commit }, change) => commit('CHANGE_PAGE', change),
    sort: ({ commit }, { key, sorting }) => commit('SORT', { key, sorting }),
  },
  modules: {},
}
