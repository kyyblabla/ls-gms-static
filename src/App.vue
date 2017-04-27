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
      'toastType',
      'showToast',
      'toastMsg'
    ]),
    watch: {
      showToast (newVal) {
        if (newVal) {
          this.$message({
            message: this.toastMsg,
            type: this.toastType,
            showClose: true
          })
        }
      }
    },
    components: {}
  }
</script>

<style>
  #app {

  }
</style>
