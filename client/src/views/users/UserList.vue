<template lang="pug">
  div
    p(v-for="user in shownUsers" :key="user.id") {{user.id }} - {{ user.firstName }} {{ user.lastName }}
    span(v-if='page !== 1' @click='changePage(-1)') Previous
    span(v-if='page !== pages - 1' @click='changePage(+1)') Next
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
