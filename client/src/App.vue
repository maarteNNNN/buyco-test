<template lang="pug">
  #app
    Navigation
    .container
      router-view
</template>

<script>
import Navigation from './components/Navigation'

export default {
  name: 'App',
  components: {
    Navigation,
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Poppins&display=swap');

body {
  font-family: 'Poppins', sans-serif;
  color: darken(#283e99, 20);
  a {
    text-decoration: none;
    color: inherit;
  }
}

.container {
  margin-top: 40px;
}

$max: 50;
$offset: 5;
$unit: 'px';
@mixin list-loop($className, $styleName) {
  $i: 0;
  @while $i <= $max {
    #{$className + $i} {
      #{$styleName}: #{$i + $unit};
    }
    $i: $i + $offset;
  }
}
@include list-loop('.p-l-', 'padding-left');
</style>
