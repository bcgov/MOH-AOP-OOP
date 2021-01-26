<template>
  <div>
    <div class="bcgov-non-printable bcgov-full-width">
      <span
        role="button"
        class="bcgov-print-page print"
        tabIndex="{0}"
        @click="handlePrint"
        @keydown="handlePrint"
      >
        Print
        <printer class="margin-left-small" />
      </span>

      <h3>{{ heading }}</h3>
    </div>

    <section class="bcgov-scroll-box bcgov-printable">
      <component v-bind:is="content"></component>
    </section>

    <section class="bcgov-non-printable pt-2">
      <label for="acceptTerms">
        <input id="acceptTerms" type="checkbox" @click="$emit('accept-terms')" />
        &nbsp;
        <b>{{ confirmText }}</b>
        <span id="asterisk" class="bcgov-mandatory">
          *
        </span>
      </label>
    </section>
  </div>
</template>

<script>
  import "./TermsOfUse.css";
  import Printer from 'mdi-vue/Printer.vue';

  export default {
    name: "TermsOfUse",
    props: {
      content: {
        type: Object,
        required: true,
      },
      heading: {
        type: String,
        required: true,
      },
      confirmText: {
        type: String,
        required: true,
      },
    },
    components: {
      "printer": Printer,
    },
    beforeMount() {
      this.$options.components.Node = this.content;
    },
    methods: {
      handlePrint() {
        window.print();
      }
    }
  }
</script>
