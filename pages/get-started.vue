<template>
  <div id="get-started" class="divcol center">
    <Header
      ref="header"
      :show-prepend="false"
      top-text="CORDIAL"
      bottom-text="BIENVENIDA"
      description="A PARTIR DE LAS PROXIMAS 48 HORAS PUEDE REVISAR SU CORREO PARA RECIBIR SUS TOKENS"
      max-width="309px"
    ></Header>

    <div v-for="i in 3" :key="i" :class="`ball-decoration-${i}`" />

    <section id="get-started-content">
      <v-btn
        class="btn-outlined"
        :disable="loading"
        :loading="loading"
      >
        NOTIFICAR AL WHATSAPP AMORYMIEL
      </v-btn>

      <p class="p tcenter">o</p>
      
      <v-btn
        class="btn"
        :disable="loading"
        :loading="loading"
        @click="$router.push('/validation')"
      >
        CREAR UNA BILLETERA
      </v-btn>
    </section>



    <Footer ref="footer">
      <a
        href="https://www.amorymiel1.com"
        target="_blank"
        class="text tcenter"
        style="--fw: 700; --text: var(--text2); margin-top: 22px"
      >www.amorymiel1.com</a>
    </Footer>
  </div>
</template>

<script>
export default {
  name: "GetStartedPage",
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
    this.$store.commit('switchTheme', 'miel')
  }
};
</script>

<style src="~/assets/styles/pages/get-started.scss" lang="scss" />
