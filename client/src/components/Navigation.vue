<template lang="pug">
  .navbar
    .navbar-item
      router-link(to="/") Home
    .navbar-item
      router-link(to="/users/") Users
    .navbar-item
      router-link(to="/users/register") Register
</template>

<script>
export default {
  name: 'Navigation',
}
</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  width: 100%;
  background-color: #283e99;
  position: fixed;
  left: 0;
  top: 0;
  color: white;
  .navbar-item {
    display: block;
    padding: 5px;
  }
}
</style>
