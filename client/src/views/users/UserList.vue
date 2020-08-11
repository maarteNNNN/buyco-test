<template lang="pug">
  div
    p(v-for="user in users" :key="user.id") {{ user.firstName }} {{ user.lastName }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UsersList',
  computed: {
    ...mapState('users', ['users']),
  },
  created: function() {
    this.$store.dispatch('users/loadUsers', { vm: this })
  },
}
</script>
