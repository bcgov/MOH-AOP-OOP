<template>
  <div class="thumbnail-container">
    <img
      :src="imageObject.fileContent"
      alt="Image Thumbnail"
      tabindex="0"
      :class="thumbnailClass"
    />
    <div class="action-strip text-center">
      <a
        href="javascript:void(0)"
        @click="deleteImage($event)"
        class="text-danger"
        tabindex="0"
        >Remove</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageObject: {
      type: Object
    }
  },
  data: () => {
    return {
      scaledWidth: 300
    };
  },
  mounted() {
    const scaledWidthString = (
      (180 * this.imageObject.naturalWidth) /
      this.imageObject.naturalHeight
    ).toFixed(0);
    this.scaledWidth = parseInt(scaledWidthString, 10);

    if (this.scaledWidth > 250) {
      this.scaledWidth = 250;
    } else if (this.scaledWidth < 30) {
      this.scaledWidth = 100;
    }

    if (isNaN(this.scaledWidth)) {
      this.scaledWidth = 300;
    }
  },
  computed: {
    thumbnailClass() {
      return "image-thumbnail";
    }
  },
  methods: {
    deleteImage() {
      this.$emit("delete", this.imageObject);
    }
  }
};
</script>

<style scoped>
.image-thumbnail {
  max-height: 100px;
  height: auto;
  max-width: 100%;
}
.image-thumbnail-width-priority {
  max-width: 270px;
  width: auto;
  max-height: 100%;
}
</style>
