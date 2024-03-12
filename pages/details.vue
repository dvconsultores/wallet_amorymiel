<template>
  <div id="details">
    <modalSelection ref="modalSelection" />

    <img src="@/assets/sources/logos/logotype.svg" alt="logotype" style="margin-top: var(--margin-header);" class="mb-4">


    <!-- details -->
    <section id="details-detail" class="d-flex flex-column" style="gap: 10px;">
      <div v-for="(value, key, i) in details" :key="i" class="jspace">
        <h5 class="mb-0">{{ key }}</h5>

        <div class="d-flex flex-column tend">
          <span>{{ value.value }}</span>
          <span>${{ value.desc }}</span>
        </div>
      </div>

      <v-card class="btn-outlined mt-3">
        <aside v-for="(value, key, i) in contractDetails" :key="i" class="space">
          <div class="center">
            <h5 class="mb-0 min-width-span">{{ key }}</h5>
            <v-tooltip top color="var(--primary)">
              <template #activator="{ on, attrs }">
                <img :src="$assets('/icons/warning-blue.svg')" alt="info" v-bind="attrs" v-on="on">
              </template>

              <p class="mb-0" style="--fw: 500; --tt: none; color: #fff !important">{{ value.helpText }}</p>
            </v-tooltip>
          </div>

          <span>{{ value.value }}</span>
        </aside>
      </v-card>
    </section>

    
    <h1 class="mb-3" style="font-size: 26px;">OFERTA PRIVADA</h1>
    <p style="--fw: 700">UN REQUISITO PARA TODO INVERSIONISTA ES TOMAR DECISIONES BASADAS EN INFORMACIÓN SÓLIDA</p>

    
    <v-card
      v-for="(value, key, i) in privateOptions" :key="i"
      class="btn-outlined d-flex align-center justify-space-between mb-4"
      style="--br: 20px; padding: 17px; gap: 19px; background-color: var(--secondary) !important;"
    >
      <div class="d-flex" style="gap: 10px;">
        <div class="d-flex flex-column" style="gap: 5px; max-width: 126px;">
          <h5 class="mb-0">{{ key }}</h5>
  
          <p class="mb-0">{{ value.desc }}</p>
        </div>

        <v-tooltip v-if="value.helpText" top color="var(--primary)">
          <template #activator="{ on, attrs }">
            <img :src="$assets('/icons/warning-blue.svg')" alt="info icon" v-bind="attrs" v-on="on">
          </template>

          <p class="mb-0" style="--fw: 500; --tt: none; color: #fff !important">{{ value.helpText }}</p>
        </v-tooltip>
      </div>

      <v-btn style="border-radius: 50px !important; max-width: 134px; min-height: 34.26px;" class="btn flex-grow-1">
        <span style="--ls: 2.5px; --fw: 400; color: #fff !important;">DESCARGAR PDF</span>
      </v-btn>
    </v-card>


    <div class="d-flex flex-column mt-7" style="gap: 15px;">
      <v-btn
        class="btn-outlined"
        style="--b-color: var(--primary); --bg: var(--secondary)"
      >
        <span style="color: var(--primary) !important;">agendar una reunión</span>
      </v-btn>

      <v-btn class="btn" @click="$refs.modalSelection.model = true">
        adquirir acciones
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailsPage",
  data() {
    return {
      details: {
        'razón social': {
          value: "PRODUCTOS AMORYMIEL, C.A.",
          desc: "J40583839-6"
        },
        'dirección': {
          value: "SAN CARLOS, COJEDES",
          desc: "VIA BOCATOMA, NRO 638, ZONA POSTAL 2201"
        },
        'presidente': {
          value: "TEOFILO MENESSINI SANTAMARIA",
          desc: "V-19.723.701 0412-1339230  "
        },
      },
      contractDetails: {
        'TOKENS EMITIDOS': {
          value: "42,000,000 AYM",
          helpText: "texto de ayuda"
        },
        'SMART CONTRACT': {
          value: "amorymiel1.near",
          helpText: "texto de ayuda"
        },
        'PRECIO POR TOKEN': {
          value: "$0.01 USD",
          helpText: "texto de ayuda"
        },
      },
      privateOptions: {
        'REPORTE ANALÍTICO': {
          desc: "Análisis exhaustivo de Amorymiel por parte de la Sociedad Calificadora de Riesgo INTELDATA",
        },
        'VALORACIÓN': {
          desc: "Cálculo de VPN",
          helpText: "texto de ayuda"
        },
      },
    }
  },
}
</script>

<style src="@/assets/styles/pages/details.scss" lang="scss"></style>
