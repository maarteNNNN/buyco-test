<template lang="pug">
  div(v-if="selectedUser")
    div(v-for="item in selectedUser")
      label(v-if="item[0] !== 'address'")
        strong {{ translations[item[0]] }}:&nbsp;
      span(v-if="item[0] !== 'address'") {{ item[1] }}
      div(v-if="item[0] === 'address'" v-for="addressItem in Object.entries(item[1])")
        label(v-if="addressItem[0] !== 'geo'")
          strong {{ translations[addressItem[0]] }}:&nbsp;
        span(v-if="addressItem[0] !== 'geo'") {{ addressItem[1] }}
    label
      strong User Location:
    l-map(
      style="height: 80%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated")

</template>

<script>
import { LMap } from 'vue2-leaflet'

export default {
  name: 'UserDetails',
  data: function() {
    return {
      selectedUser: null,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 3,
      center: [47.41322, -1.219482],
      bounds: null,
      translations: {
        id: 'ID',
        firstName: 'First Name',
        lastName: 'Name Name',
        email: 'Email',
        phone: 'Phone',
        zipCode: 'Zip Code',
        city: 'City',
        streetAddress: 'Address',
        country: 'Country',
        state: 'State',
      },
    }
  },
  mounted: async function() {
    await this.$store.dispatch('users/getUserById', this.$route.params.id)
    const user = await this.$store.getters['users/getUserById']
    this.selectedUser = Object.entries(user)
    this.center = [user.address.geo.latitude, user.address.geo.longitude]
  },
  components: {
    LMap,
  },
}
</script>
