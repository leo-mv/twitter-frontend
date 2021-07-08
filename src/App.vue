<template>
  <div id="app">

    <component :is="layout"></component>
    
  </div>
</template>

<script>
import FormLayout from '@/layouts/FormLayout'
import MainLayout from '@/layouts/MainLayout'

export default {
  computed: {
    layout() {
      return this.$route.meta.layout
    }
  },
  components: {
    FormLayout,
    MainLayout
  }
}
</script>
