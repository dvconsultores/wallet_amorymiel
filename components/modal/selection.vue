<template>
  <v-bottom-sheet
    v-model="model"
    max-width="max-content"
    :overlay-opacity=".9"
    content-class="modal-selection"
  >
    <v-card class="selection-card">
      <div class="selection-card__wrapper">
        <aside class="mx-auto" style="width: 270px;">
          <h2 class="mb-0">SELECCIONAR</h2>
          <h2 style="text-align: end;">FECHA</h2>
        </aside>

        <!-- TODO date selector here -->
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "ModalSelection",
  data() {
    return {
      model: false,
    }
  },
}
</script>

<style lang="scss">
.modal-selection {

  .selection-card {
    --padding-block: 29px;

    width: 390px;
    height: 567px /* min(60dvh, 567px) */;
    border-radius: 20px 20px 0 0;
    background-color: #DEE6EA !important;
    padding-block: var(--padding-block);
    padding-right: 2px;

    .selection-card__wrapper {
      display: flex;
      flex-direction: column;
      scrollbar-gutter: stable;
      max-height: calc(var(--height) - var(--padding-block) * 2);
      padding-inline: var(--margin-global);
      border-radius: 0 !important;
      overflow-y: auto;
    }

    h2 {
      --fw: 700;
      --ls: 2.5px;
      font-size: 20px;
    }
    
    h5 {
      --fw: 700;
      --fs: 12px;
      color: #000;
      font-family: var(--font2);
      line-height: normal;
    }

    span:first-child {
      --fw: 700;
      color: #000;
      text-align: right;
      font-size: 12px;
      font-family: var(--font2);
      line-height: normal;

      + span {
        --fw: 400;
        color: #333;
        text-align: right;
        font-family: var(--font2);
        font-size: 10px;
        line-height: normal;
      }
    }
  }
}
</style>
