<template>
  <div class="bcgov-pos-relative" v-bind:class="sidecardCss">
    <div class="col-12 pt-2 bcgov-pos-relative">
      <p />
      <section
        v-if="type === 'grey'"
        id="grey-section"
        class="bcgov-submit-container bcgov-grey-custom"
      >
        <h2 class="bcgov-color-heading">{{ heading }}</h2>
        <div class="bcgov-submit-content">
          <span>{{ content }}</span>
        </div>
      </section>
      <section v-if="type === 'blue'" id="blue-section" class="bcgov-submit-container">
        <h2 class="bcgov-heading-style">{{ heading }}</h2>
        <div class="bcgov-submit-content">
          <span>{{ content }}</span>
          <a v-if="image && imageLink" v-bind:href="imageLink" target="_blank" rel="noopener noreferrer">
            <img
              v-bind:src="image"
              alt="imagelink"
              height="65px"
              width="310px"
            />
          </a>
        </div>
      </section>
      <section v-if="type === 'bluegrey'" id="bluegrey-section" class="bcgov-bluegrey-container">
        <div class="bcgov-container-background bcgov-bluegrey-heading">
          <h2 v-if="!icon" class="bcgov-heading-style">{{ heading }}</h2>
          <h2 v-if="icon" class="bcgov-heading-style">
            <div class="bcgov-side-card-row">
              <div class="bcgov-round-icon-wrapper">
                <component v-bind:is="icon"></component>
              </div>
              <div v-bind:class="sidecardTitleCss">{{ heading }}</div>
            </div>
          </h2>
        </div>
        <div class="bcgov-bluegrey-content">
          <span class="bcgov-content-style">{{ content }}</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import "./Sidecard.css";

  export default {
    name: "Sidecard",
    props: {
      heading: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
      imageLink: {
        type: String,
        required: false,
      },
      isWide: {
        type: Boolean,
        required: false,
        default: false,
      },
      icon: {
        type: Object,
        required: false,
      },
    },
    data() {
      return {
        sidecardCss: this.isWide ? "bcgov-wide-dashboard-spacing" : "bcgov-dashboard-spacing",
        sidecardTitleCss: this.heading.length > 30 ? "bcgov-large-title" : "bcgov-side-card-title",
      }
    },
    beforeMount() {
      this.$options.components.Node = this.icon;
    },
  }
</script>
