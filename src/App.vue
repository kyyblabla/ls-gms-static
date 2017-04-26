<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'app',
    computed: mapGetters([
      'toast'
    ])
  }
</script>

<style>
  #app {

  }
</style>
