<template>
  <v-app id="default-layout" :style="`--bg-app: url(${$assets('/images/background.png')})`">
    <Alerts ref="alerts" />

    <img
      id="default-layout-background"
      :src="$assets('/images/circle.svg')"
      alt="background"
      :style="`--w: 634px; --top: 70px`"
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
  name: "DefaultLayoutVariant",
  data() {
    return {
      excludedFooterRoutes: [
        '/details',
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

<style src="~/assets/styles/layouts/default-layout.scss" lang="scss" />
