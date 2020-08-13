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
      let sorting = this.sorting[key] === 'ASC' ? 'DESC' : 'ASC'
      this.$store.dispatch('users/sort', { key, sorting })
    },
  },
}
</script>

<template lang="pug">
  div
    table
      thead
        tr
          th.clickable(@click="sort('id')") id
          th.clickable(@click="sort('firstName')") name
      tbody(style="text-align: center")
        tr(v-for="user in shownUsers" :key="user.id")
          td {{user.id }}
          td {{ user.firstName }} {{ user.lastName }}
        tr
          td.clickable(v-if='page !== 1' @click='changePage(-1)') Previous Page
          td(v-else)
          td.clickable(v-if='page !== pages - 1' @click='changePage(+1)') Next Page
          td(v-else)
</template>

<style lang="scss" scoped>
.clickable {
  cursor: pointer;
  user-select: none;
}
table {
  width: 100%;
  th {
    width: 50%;
    background-color: #283e99;
    color: white;
  }
  tr:nth-child(even) {
    background-color: lighten(#283e99, 45);
  }
  tr {
    background-color: lighten(#283e99, 55);
  }
}
</style>
