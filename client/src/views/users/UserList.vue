<template lang="pug">
  div
    table
      thead
        tr
          th id
          th name
      tbody(style="text-align: center")
        tr(v-for="user in shownUsers" :key="user.id")
          td {{user.id }}
          td {{ user.firstName }} {{ user.lastName }}
        tr
          td(v-if='page !== 1' @click='changePage(-1)') Previous
          td(v-if='page !== pages - 1' @click='changePage(+1)') Next
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'UsersList',
  computed: {
    ...mapState('users', ['users', 'page', 'pages', 'shownUsers']),
    ...mapGetters('users', ['getUsersByPage']),
  },
  created: function() {
    this.$store.dispatch('users/loadUsers')
  },
  methods: {
    changePage: function(change) {
      this.$store.dispatch('users/changePage', change)
    },
  },
}
</script>
