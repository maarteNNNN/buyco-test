<template lang="pug">
  div
    p(v-for="user in getUsersByPage" :key="user.id") {{user.id }} - {{ user.firstName }} {{ user.lastName }}
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'UsersList',
  computed: {
    ...mapState('users', ['users']),
    ...mapGetters('users', ['getUsersByPage']),
  },
  created: function() {
    this.$store.dispatch('users/loadUsers')
  },
}
</script>
