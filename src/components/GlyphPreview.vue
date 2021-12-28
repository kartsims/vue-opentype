<template>
  <div class="glyph-preview">
    <div
      class="svg-container"
      :style="containerCss"
    >
      <svg :viewBox="viewBox">
        <line
          x1="0"
          :x2="width"
          :y1="baseline"
          :y2="baseline"
          stroke="red"
          stroke-width="5"
        />
        <line
          x1="0"
          :x2="width"
          :y1="baseline - font.ascender"
          :y2="baseline - font.ascender"
          stroke="blue"
          stroke-width="5"
        />
        <line
          x1="0"
          :x2="width"
          :y1="baseline - font.descender"
          :y2="baseline - font.descender"
          stroke="blue"
          stroke-width="5"
        />
        <g
          :transform="`translate(${glyphX} ${baseline})`"
        >
          <rect
            :x="boundingBox.x1"
            :y="boundingBox.y1"
            :width="boundingBox.x2 - boundingBox.x1"
            :height="boundingBox.y2 - boundingBox.y1"
            fill="none"
            stroke="blue"
            stroke-width="5"
            style="opacity: .2"
          />
          <path
            :d="path.toPathData()"
            fill="none"
            stroke="black"
            stroke-width="2"
          />
        </g>
      </svg>
    </div>
    <pre>{{ glyph.name }} ({{ glyph.unicode }})</pre>
    <pre v-if="glyph.unicodes.length > 1">
      <strong>Unicodes: {{ glyph.unicodes.length }}</strong>
    </pre>
  </div>
</template>

<script>
export default {
  props: {
    font: {
      type: Object,
      required: true,
    },
    glyph: {
      type: Object,
      required: true,
    },
  },
  computed: {
    width() {
      return this.font.unitsPerEm * 2
    },
    height() {
      return this.font.unitsPerEm * 3
    },
    containerCss() {
      const actualWidth = 400
      return {
        width: actualWidth + 'px',
        height: this.height * actualWidth / this.width + 'px',
      }
    },
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
    baseline() {
      return this.height / 2
    },
    boundingBox() {
      return this.path.getBoundingBox()
    },
    glyphX() {
      return (this.width - (this.boundingBox.x2 - this.boundingBox.x1)) / 2
    },
    path() {
      return this.glyph.getPath(0, 0, this.width * .6)
    },
  },
};
</script>

<style scoped>
.svg-container {
  margin: 0 auto;
}
svg {
  background: #fff;
}
</style>
