<template>
  <div id="activity-card">
    <div style="display: flex; gap: var(--gap)">
      <img :src="matchingType.icon" :alt="`${type} icon`">

      <div class="divcol">
        <span>{{matchingType.title}}{{coin ? ` ${coin}` : ''}}</span>
        <span>{{matchingType.text}} 
          <span style="--fw: 700">{{account}}</span>
        </span>
        <span v-if="text2">{{matchingType.text2}} 
          <span style="--fw: 700">{{text2}}</span>
        </span>
      </div>
    </div>

    <div class="divcol">
      <span style="color: var(--primary)">{{amount}} {{coin}}</span>
      <span style="text-align: right">{{date}} atrás</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityCard",
  props: {
    type: {
      type: String,
      default: undefined
    },
    account: {
      type: String,
      default: undefined
    },
    coin: {
      type: String,
      default: undefined
    },
    date: {
      type: String,
      default: undefined
    },
    amount: {
      type: String,
      default: undefined
    },
    text2: {
      type: String,
      default: undefined
    },
  },
  data() {
    return {
      types: {
        "receive": {
          icon: this.$assets("/icons/icon-recieved.svg"),
          title: "received",
          text: "Desde: ",
          text2: "",
        },
        "sent": {
          icon: this.$assets("/icons/icon-sent.svg"),
          title: "send",
          text: "Para: ",
          text2: "",
        },
        "access": {
          icon: this.$assets("/icons/icon-access-key.svg"),
          title: "access key",
          text: "Para: ",
          text2: "",
        },
        "account": {
          icon: this.$assets("/icons/icon-new-account.svg"),
          title: "new account created",
          text: "Cuenta",
          text2: "",
        },
        "function": {
          icon: this.$assets("/icons/double-chevron-right.svg"),
          title: "function call",
          text: "Desde: ",
          text2: "Metodo: ",
        },
        "batch": {
          icon: this.$assets("/icons/menu-active.svg"),
          title: "batch transactions",
          text: "Acciones realizadas: ",
          text2: "",
        },
      }
    }
  },
  computed: {
    matchingType() {
      return this.types[this.type]
    }
  },
};
</script>

<style lang="scss">
#activity-card {
  --gap: 17px;

  display: flex;
  justify-content: space-between;
  gap: var(--gap);

  .divcol {
    justify-content: center;
  }

  img {
    --size: 40px;
    width: var(--size) !important;
    height: var(--size) !important;
    object-fit: cover;
  }

  span:first-of-type:not(span > span) {
    --fw: 700;
    color: var(--text2);
    font-family: var(--font2) !important;
    font-size: 12px !important;
    line-height: 1;
    text-transform: uppercase;
  }

  span + span {
    --fw: 500;
    color: var(--text2);
    font-family: var(--font2) !important;
    line-height: 1;
    font-size: 10px !important;
  }
}
</style>
