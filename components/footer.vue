<template>
  <v-footer id="footer" absolute color="transparent">
    <slot />
  </v-footer>
</template>

<script>
export default {
  name: "FooterComponent",
}
</script>

<style lang="scss">
#footer {
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  padding-inline: var(--margin-global) !important;
}
</style>
