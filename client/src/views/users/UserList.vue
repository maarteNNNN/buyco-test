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
    deleteUser(id) {
      this.$store.dispatch('users/deleteUser', id)
    }
  },
}
</script>

<template lang="pug">
  div
    table
      thead
        tr
          th.clickable(@click="sort('id')") id
            |
            span.p-l-5(v-if="sorting.id === 'ASC'") &#x25B2;
            span.p-l-5(v-else-if="sorting.id") &#x25BC;
            span.p-l-5(v-else) &#x25B2; &#x25BC;
          th.clickable(@click="sort('firstName')" colspan="2") name
            |
            span.p-l-5(v-if="sorting.firstName === 'DESC'") &#x25B2;
            span.p-l-5(v-else-if="sorting.firstName") &#x25BC;
            span.p-l-5(v-else="sorting.firstName") &#x25B2; &#x25BC;
      tbody(style="text-align: center")
        tr(v-for="user in shownUsers" :key="user.id")
          td
            router-link(:to="`/users/${user.id}`") {{ user.id }}
          td
            router-link(:to="`/users/${user.id}`") {{ user.firstName }} {{ user.lastName }}
          td
            a.clickable(@click="deleteUser(user.id)") &#x1F5D1;
        tr
          td.clickable(v-if='page !== 1' @click='changePage(-1)') Previous Page
          td(v-else)
          td.clickable(v-if='page !== pages - 1' @click='changePage(+1)'  colspan="2") Next Page
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
