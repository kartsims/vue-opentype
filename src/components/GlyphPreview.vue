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
          stroke-width="2"
          stroke-dasharray="20 20"
        />
        <line
          x1="0"
          :x2="width"
          :y1="baseline - font.ascender"
          :y2="baseline - font.ascender"
          stroke="grey"
          stroke-width="2"
          stroke-dasharray="20 20"
        />
        <line
          x1="0"
          :x2="width"
          :y1="baseline - font.descender"
          :y2="baseline - font.descender"
          stroke="grey"
          stroke-width="2"
          stroke-dasharray="20 20"
        />
        <!-- <line
          :x1="glyphX"
          :x2="glyphX"
          y1="0"
          :y2="height"
          stroke="grey"
          stroke-width="2"
          stroke-dasharray="20 20"
        />
        <line
          :x1="glyphX + glyph.advanceWidth"
          :x2="glyphX + glyph.advanceWidth"
          y1="0"
          :y2="height"
          stroke="grey"
          stroke-width="2"
          stroke-dasharray="20 20"
        /> -->
        <path
          :d="path.toPathData()"
          fill="none"
          stroke="black"
          stroke-width="2"
        />
        <PathCommands
          :path="path"
        />


        <g :transform="`translate(${glyphX} ${baseline})`">
          <line
            x1="0"
            x2="0"
            y1="0"
            :y2="-boundingBox.y2 + boundingBox.y1"
            stroke="grey"
            stroke-width="2"
            stroke-dasharray="20 20"
          />
          <rect
            x="0"
            :y="-boundingBox.y2 + boundingBox.y1"
            :width="glyph.leftSideBearing"
            :height="boundingBox.y2 - boundingBox.y1"
            fill="grey"
            style="opacity: .1"
          />
          <line
            :x1="glyph.leftSideBearing + glyph.advanceWidth"
            :x2="glyph.leftSideBearing + glyph.advanceWidth"
            y1="0"
            :y2="-boundingBox.y2 + boundingBox.y1"
            stroke="grey"
            stroke-width="2"
            stroke-dasharray="20 20"
          />
          <!-- BOUNDING BOX
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
          -->
        </g>
      </svg>
    </div>
    <!-- <pre>path.commands => {{ path.commands }}</pre> -->
    <pre>{{ glyph.name }} ({{ glyph.unicode }})</pre>
    <pre v-if="glyph.unicodes.length > 1">
      <strong>Unicodes: {{ glyph.unicodes.length }}</strong>
    </pre>
  </div>
</template>

<script>
import PathCommands from './PathCommands.vue';
export default {
  components: { PathCommands },
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
      return this.font.unitsPerEm * 2
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
      return this.height * .7
    },
    boundingBox() {
      return this.path.getBoundingBox()
    },
    glyphX() {
      const bbox = this.glyph.getPath(0, 0, this.font.ascender - this.font.descender).getBoundingBox()
      return (this.width - (bbox.x2 - bbox.x1)) / 2
    },
    path() {
      const path = this.glyph.getPath(0, 0, this.font.ascender - this.font.descender)
      path.move(this.glyphX, this.baseline)
      return path
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
