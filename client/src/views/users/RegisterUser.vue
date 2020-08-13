<template lang="pug">
  div
    .input-field
      label First Name
      input(v-model="formData.firstName" placeholder="First Name")
    .input-field
      label Last Name
      input(v-model="formData.lastName" placeholder="Last Name")
    .input-field
      label Email
      input(v-model="formData.email" placeholder="Email")
    .input-field
      label Phone
      input(v-model="formData.phone" placeholder="Phone")
    .input-field
      label ZIP
      input(v-model="formData.address.zipCode" placeholder="ZIP")
    .input-field
      label City
      input(v-model="formData.address.city" placeholder="City")
    .input-field
      label Street
      input(v-model="formData.address.streetAddress" placeholder="Street")
    .input-field
      label Country
      input(v-model="formData.address.country" placeholder="Country")
    .input-field
      a.button(@click='register') Register
</template>

<script>
export default {
  name: 'RegisterUser',
  data: function() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: {
          zipCode: '',
          city: '',
          streetAddress: '',
          country: '',
          state: '',
          geo: {
            latitude: '',
            longitude: '',
          },
        },
      },
    }
  },
  methods: {
    register: function() {
      this.$store.dispatch('users/addUser', this.formData)
      this.$router.push('/users')
    },
  },
}
</script>

<style lang="scss" scoped>
.input-field {
  margin-top: 10px;
  label {
    display: block;
  }
  input {
    display: block;
    width: 100%;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid #283e99;
    color: darken(#283e99, 10);
    ::placeholder {
      padding: 10px;
    }
  }
  .button {
    background-color: #283e99;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    display: block;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
}
</style>
