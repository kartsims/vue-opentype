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
        <g
          :transform="`translate(${glyphX} ${baseline})`"
        >
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
          <path
            :d="path.toPathData()"
            fill="none"
            stroke="black"
            stroke-width="2"
          />
          <g
            v-for="(cmd, i) in path.commands"
            :key="'command' + i"
          >
            <circle
              v-if="cmd.type === 'M' || cmd.type === 'L'"
              :cx="cmd.x"
              :cy="cmd.y"
              r="6"
              fill="orange"
            />
            <template
              v-else-if="cmd.type === 'Q'"
            >
              <circle
                :cx="cmd.x"
                :cy="cmd.y"
                r="8"
                stroke="green"
                stroke-width="3"
                fill="none"
              />
              <circle
                :cx="cmd.x1"
                :cy="cmd.y1"
                r="5"
                fill="green"
              />
              <line
                :x1="cmd.x"
                :y1="cmd.y"
                :x2="cmd.x1"
                :y2="cmd.y1"
                stroke="green"
                stroke-width="3"
              />
            </template>
            <template
              v-else-if="cmd.type === 'C'"
            >
              <circle
                :cx="cmd.x"
                :cy="cmd.y"
                r="8"
                stroke="blue"
                stroke-width="3"
                fill="none"
              />
              <circle
                :cx="cmd.x1"
                :cy="cmd.y1"
                r="5"
                fill="blue"
              />
              <line
                :x1="path.commands[i - 1].x"
                :y1="path.commands[i - 1].y"
                :x2="cmd.x1"
                :y2="cmd.y1"
                stroke="blue"
                stroke-width="3"
              />
              <circle
                :cx="cmd.x2"
                :cy="cmd.y2"
                r="5"
                fill="blue"
              />
              <line
                :x1="cmd.x"
                :y1="cmd.y"
                :x2="cmd.x2"
                :y2="cmd.y2"
                stroke="blue"
                stroke-width="3"
              />
            </template>
          </g>
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
      return (this.width - (this.boundingBox.x2 - this.boundingBox.x1)) / 2
    },
    path() {
      return this.glyph.getPath(0, 0, this.font.ascender - this.font.descender)
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
