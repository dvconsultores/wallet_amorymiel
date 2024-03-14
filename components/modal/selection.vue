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


        <!-- months -->
        <v-slide-group
          v-model="month"
          center-active
          mandatory
          show-arrows
          class="month-selector"
        >
          <template #prev="{ on, attrs }">
            <img
              :src="$assets('/icons/double-chevron-right.svg')" alt="prev icon"
              style="transform: rotate(180deg);"
              v-bind="attrs"
              v-on="on"
            >
          </template>
          
          <v-slide-item v-for="(_, item, i) in months" :key="i" v-slot="{ active, toggle }">
            <span
              class="month-text"
              :class="{ selected: active }"
              @click="toggle"
            >{{ item }}</span>
          </v-slide-item>

          <template #next="{ on, attrs }">
            <img
              :src="$assets('/icons/double-chevron-right.svg')" alt="next icon"
              v-bind="attrs"
              v-on="on"
            >
          </template>
        </v-slide-group>


        <!-- days -->
        <div class="day-selector">
          <v-slide-group
            v-model="day"
            center-active
            mandatory
            show-arrows
            :style="`--bg-image: url(${$assets('/images/bg-date-picker.svg')})`"
          >
            <template #prev="{ on, attrs }">
              <img
                :src="$assets('/icons/double-chevron-right.svg')" alt="prev icon"
                style="transform: rotate(180deg);"
                v-bind="attrs"
                v-on="on"
              >
            </template>

            <v-slide-item v-for="(item, i) in days" :key="i" v-slot="{ active, toggle }">
              <div
                class="day-text"
                :class="{ selected: active }"
                @click="toggle"
              >
                <span>{{ item.dayOfWeek }}</span>
                <span>{{ item.date }}</span>
              </div>
            </v-slide-item>
            
            <template #next="{ on, attrs }">
              <img
                :src="$assets('/icons/double-chevron-right.svg')" alt="next icon"
                v-bind="attrs"
                v-on="on"
              >
            </template>
          </v-slide-group>
        </div>


        <div class="d-flex align-center" style="gap: 10px;">
          <!-- years -->
          <v-select
            v-model="year" solo
            :items="years"
            :menu-props="{ contentClass: 'menu-selection' }"
            style="--bg: transparent; --b: 1px var(--primary) solid; --c-icon: var(--primary)"
            hide-details
          />

          <v-btn class="btn-icon" @click="onComplete">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </div>
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
      day: 0,
      month: 0,
      year: 2024,
    }
  },
  computed: {
    months() {
      return {
        ENE: this.generateDays(31, 0),
        FEB: this.generateDays(this.isLeapYear(this.year) ? 29 : 28, 1),
        MAR: this.generateDays(31, 2),
        ABR: this.generateDays(30, 3),
        MAY: this.generateDays(31, 4),
        JUN: this.generateDays(30, 5),
        JUL: this.generateDays(31, 6),
        AGO: this.generateDays(31, 7),
        SEP: this.generateDays(30, 8),
        OCT: this.generateDays(31, 9),
        NOV: this.generateDays(30, 10),
        DIC: this.generateDays(31, 11),
      }
    },
    days() {
      return Object.values(this.months)[this.month]
    },
    years() {
      return Array.from({ length: 21 }, (_, i) => new Date().getFullYear() + i)
    }
  },
  methods: {
    onComplete() {
      const date = new Date(this.year, this.month, this.days[this.day].date);

      this.model = false
      this.$emit('complete', date)
    },
    generateDays(numDays, month) {
      return Array.from({ length: numDays }, (_, i) => {
        const date = new Date(this.year, month, i + 1);
        return {
          date: i + 1,
          dayOfWeek: this.getDayOfWeek(date),
        };
      });
    },
    getDayOfWeek(date) {
      const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      return days[date.getDay()];
    },
    isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    },
  },
}
</script>

<style lang="scss">
$font-size-input: max(13px, 1em);

.menu-selection {
  background: #DEE6EA !important;
  border: 1px solid var(--primary);
  border-radius: 10px;

  * {
    font-size: $font-size-input !important;
    font-weight: 700 !important;
    font-family: var(--font2) !important;
    letter-spacing: 3px !important;
  }

  .v-list-item__title { text-align: center }
}

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

    img[alt*="icon"].inactive { opacity: .2 }

    .v-text-field {
      --fs: $font-size-input;
      --ls: 3px;

      input { display: none }
      .v-select__selections { justify-content: center }
      .v-input__slot { margin-bottom: 0 !important }
    }


    
    .month-selector {
      border: 1px solid #7C7B7F;
      border-inline: none;
      height: 48px;

      .v-slide-group {
        &__prev { justify-content: flex-start }
        &__next { justify-content: flex-end }
        &__prev, &__next { min-width: 30px }
        
        &__content { gap: 20px }
      }


      .month-text {
        display: grid;
        place-content: center;
        color: #7C7B7F !important;
        font-family: var(--font2);
        font-size: 12px !important;
        font-weight: 700 !important;
        letter-spacing: 0.39em !important;
        text-align: center !important;
        cursor: pointer;
        
        &.selected {
          color: #000 !important;
          font-weight: 800 !important;
        }
      }
    }


    .day-selector {
      --item-size: 100px;

      .v-item-group {
        $size: 300px;
        transform: rotate(-90deg);
        width: $size;
        height: $size;
        margin-inline: auto !important;
        margin-block: 20px !important;
        
        &.v-slide-group { flex-direction: column-reverse }
        .v-slide-group__content {
          gap: 10px;
          padding-inline: var(--item-size);
        }
      }
      .v-slide-group__wrapper {
        $size: 180px;
        background: center no-repeat var(--bg-image);
        background-size: $size $size;
      }


      .day-text {
        transform: rotate(90deg);
        width: var(--item-size);
        display: grid;
        place-content: center;
        place-items: center;
        cursor: pointer;

        span {
          font-family: var(--font1);
          color: #7C7B7F;
          text-align: center;

          &:first-child {
            font-size: 9px !important;
            font-weight: 300 !important;
            letter-spacing: 0.11em !important;

            + span {
              font-size: 32px !important;
              font-weight: 700 !important;
              letter-spacing: 0em !important;
            }
          }
        }

        &.selected {
          span {
            color: #000 !important;
            &:first-child {
              font-size: 10px !important;
              + span { font-size: 48px !important }
            }
          }
        }
      }
    }
  }
}
</style>
