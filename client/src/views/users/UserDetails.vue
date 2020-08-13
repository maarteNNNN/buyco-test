<template lang="pug">
  div
    div(v-for="item in user")
      label(v-if="item[0] !== 'address'")
        strong {{ translations[item[0]] }}:&nbsp;
      span(v-if="item[0] !== 'address'") {{ item[1] }}
      div(v-if="item[0] === 'address'" v-for="addressItem in Object.entries(item[1])")
        label(v-if="addressItem[0] !== 'geo'")
          strong {{ translations[addressItem[0]] }}:&nbsp;
        span(v-if="addressItem[0] !== 'geo'") {{ addressItem[1] }}
    label
      strong User Location:


</template>

<script>
import { LMap } from 'vue2-leaflet'

export default {
  name: 'UserDetails',
  data: function() {
    return {
      user: [],
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
  mounted: function() {
    this.user = Object.entries(
      this.$store.getters['users/getUserById'](this.$route.params.id),
    )
  },
  components: {
    LMap,
  },
}
</script>
