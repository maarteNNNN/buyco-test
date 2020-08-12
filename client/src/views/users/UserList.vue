<template lang="pug">
  div
    table
      thead
        tr
          th(@click="sort('id')") id
          th(@click="sort('firstName')") name
      tbody(style="text-align: center")
        tr(v-for="user in shownUsers" :key="user.id")
          td {{user.id }}
          td {{ user.firstName }} {{ user.lastName }}
        tr
          td(v-if='page !== 1' @click='changePage(-1)') Previous
          td(v-if='page !== pages - 1' @click='changePage(+1)') Next
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UsersList',
  computed: {
    ...mapState('users', ['users', 'page', 'pages', 'shownUsers', 'sorting']),
  },
  created: function() {
    this.$store.dispatch('users/loadUsers')
  },
  methods: {
    changePage: function(change) {
      this.$store.dispatch('users/changePage', change)
    },
    sort(key) {
      console.log(key)
      let sorting = this.sorting[key] === 'ASC' ? 'DESC' : 'ASC'
      this.$store.dispatch('users/sort', { key, sorting })
    },
  },
}
</script>
