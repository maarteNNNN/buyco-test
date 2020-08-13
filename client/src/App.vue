<template lang="pug">
  #app
    router-view
</template>

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
