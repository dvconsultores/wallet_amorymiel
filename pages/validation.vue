<template>
  <v-form id="validation" ref="formEmail" class="divcol center">
    <Header
      ref="header"
      top-text="VALIDACIÓN"
      bottom-text="EN PROCESO"
      description="LES FUE COMUNICADO EN LA INVITACIÓN QUE AL INVERTIR PROCEDEMOS A UNA REVISIÓN PARA EVITAR EL LAVADO DE CAPITALES Y FINANCIAMIENTO AL TERRORISMO"
      max-width="305px"
    />

    <div v-for="i in 3" :key="i" :class="`ball-decoration-${i}`" />

    <section id="validation-content">
      <v-text-field
        solo label="nombre completo"
        style="--margin-message: 1px; --bg: #fff"
      ></v-text-field>

      <v-text-field
        solo label="correo electrónico"
        style="--margin-message: 1px; --bg: #fff"
      ></v-text-field>
      
      <v-text-field
        solo label="cédula de identidad"
        style="--margin-message: 1px; --bg: #fff"
      ></v-text-field>

      <v-btn
        class="btn"
        :disable="loading"
        :loading="loading"
        @click="$router.push('/payment')"
      >
        RECIBIR TOKEN AL CORREO
      </v-btn>
    </section>



    <Footer ref="footer">
      <span
        class="text tcenter"
        style="--fw: 700; --text: var(--text2); margin-block: 22px 50px"
      >POLÍTICA DE PRIVACIDAD</span>
    </Footer>
  </v-form>
</template>

<script>
export default {
  name: "ValidationPage",
  layout: "auth-layout",
  data() {
    return {
      loading: false,
    }
  },
  head() {
    const title = 'Get started';
    return {
      title,
    }
  },
  beforeMount() {
    this.$store.commit('switchTheme', 'amor')
  }
};
</script>

<style src="~/assets/styles/pages/validation.scss" lang="scss" />