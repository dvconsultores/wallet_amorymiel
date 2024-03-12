<template>
  <v-app id="auth-layout" :style="`--bg-app: url(${$assets('/images/background.png')})`">
    <Alerts ref="alerts" />

    <img
      id="auth-layout-background"
      :src="$assets('/images/circle-main.svg')"
      alt="background"
      :style="`--w: 634px`"
    >

    <v-main class="parent">
      <nuxt-child data-nuxt="childs" />
    </v-main>
    
    <Footer v-if="!excludedFooterRoutes.includes(route)" ref="footer">
      <span class="text tcenter" style="--text: var(--text2)">© 2023 Near p2p LLC. reservados todos los derechos.</span>
      <a class="text" style="--fw: 700; color: var(--primary) !important" href="#" target="_blank">
        Términos de política y privacidad del servicio
      </a>
    </Footer>
  </v-app>
</template>

<script>
export default {
  name: "AuthLayout",
  data() {
    return {
      excludedFooterRoutes: [
        '/get-started',
      ],
    }
  },
  computed: {
    route() {
      return this.$route.path
    }
  }
}
</script>

<style src="~/assets/styles/layouts/auth-layout.scss" lang="scss" />
