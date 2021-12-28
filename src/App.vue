<template>
  <div id="app">
    <template v-if="font">
      <div class="glyphs">
        <GlyphPreview
          v-if="previewGlyph"
          :font="font"
          :glyph="previewGlyph"
        />
      </div>
      <div class="glyphs">
        <GlyphPreview
          v-for="(glyph, i) in font.glyphs.glyphs"
          :key="'glyph' + i"
          :font="font"
          :glyph="glyph"
        />
      </div>
      <hr/>
      <FontData
        :font="font"
      />
    </template>
  </div>
</template>

<script>
import opentype from 'opentype.js'
import FontData from './components/FontData.vue'
import GlyphPreview from './components/GlyphPreview.vue'

export default {
  components: {
    FontData,
    GlyphPreview,
  },
  data() {
    return {
      previewGlyph: null,
      font: null,
    };
  },
  created() {
    this.loadFont()
  },
  mounted() {
    document.addEventListener('keyup', (event) => {
      if (event.key.length !== 1) return;
      const unicode = event.key.charCodeAt()
      const glyph = Object.values(this.font.glyphs.glyphs).find(i => i.unicode === unicode)
      if (glyph) {
        this.previewGlyph = glyph
      }
    })
    this.loadFont()
  },
  computed: {
    previewGlyph() {
      return this.font.glyphs.glyphs[74]
    }
  },
  methods: {
    async loadFont() {
      try {
        this.font = await opentype.load('fonts/Lora-SemiBold.ttf')
        // this.font = await opentype.load('momcake.otf')
      } catch(err) {
        console.log('err', err);
      }
    }
  }
}
</script>

<style>
body {
  background: #f4f4f4;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.glyphs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
</style>
