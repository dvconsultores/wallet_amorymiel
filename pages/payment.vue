<template>
  <div id="payment">
    <img src="@/assets/sources/logos/logotype.svg" alt="logotype" style="margin-top: var(--margin-header);" class="mb-4">


    <!-- details -->
    <v-card id="payment-detail" class="btn-outlined">
      <aside v-for="(value, key, i) in details" :key="i" class="space">
        <h5 class="mb-0">{{ key }}</h5>

        <div class="d-flex" style="gap: 12px;">
          <span class="center">{{ value.value }}</span>

          <v-btn class="btn-icon" :style="`--size: 29px; visibility: ${value.copyText ? 'visible' : 'hidden'}`">
            <img :src="$assets('/icons/copy.svg')" alt="copy to clipboard" style="--w: 15px">
          </v-btn>
        </div>
      </aside>
    </v-card>


    <h1 class="text-center" style="font-size: 26px;">COMPRAR TOKENS</h1>

    <v-card
      class="btn-outlined d-flex align-center justify-space-between mb-4"
      style="--br: 20px; padding: 17px; gap: 19px; background-color: var(--secondary) !important;"
    >
      <div class="d-flex flex-column" style="gap: 5px; max-width: 126px;">
        <h5 class="mb-0">MONTO A INVERTIR:</h5>

        <p class="mb-0">Bs 344.71</p>
      </div>

      <v-btn style="border-radius: 50px !important; max-width: 134px; min-height: 34.26px;" class="btn flex-grow-1">
        <span style="color: #fff !important;">MODIFICAR</span>
      </v-btn>
    </v-card>


    <h5 style="padding-inline: 17px;">INFORMACIÓN DEL PAGO</h5>

    <v-form @submit.prevent>
      <v-text-field
        solo label="banco desde el que envía"
        style="--margin-message: 1px; --bg: #fff"
      ></v-text-field>
      
      <v-text-field
        solo label="0424"
        style="--margin-message: 1px; --bg: #fff"
      ></v-text-field>
      
      <v-text-field
        solo label="número de telefono"
        style="--margin-message: 1px; --bg: #fff"
      ></v-text-field>
      
      <v-text-field
        solo label="fecha"
        style="--margin-message: 1px; --bg: #fff"
      ></v-text-field>
      
      <v-text-field
        solo label="referencia"
        style="--margin-message: 1px; --bg: #fff"
      ></v-text-field>
    </v-form>

    <v-btn class="btn mt-4" style="width: 100%;" @click="$router.push('/details')">
      Validar el pago
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "PaymentPage",
  data() {
    return {
      details: {
        'cuenta': {
          value: "0138-0028-61-0280040628",
          copyText: "0138-0028-61-0280040628"
        },
        'telefono': {
          value: "0414-4081161",
          copyText: "0414-4081161"
        },
        'rif': {
          value: "J-40583839-6",
          copyText: "J-40583839-6"
        },
        'banco': {
          value: "BANCO PLAZA"
        },
      },
    }
  },
}
</script>

<style src="@/assets/styles/pages/payment.scss" lang="scss"></style>
