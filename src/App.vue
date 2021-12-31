<template>
  <div
    id="app"
    v-cloak
    @drop.prevent="dropHandler"
    @dragover.prevent
  >
    <template v-if="font">
      <FontHeader
        :font="font"
      />
      <div class="glyphs">
        <GlyphPreview
          v-if="previewGlyph"
          :font="font"
          :glyph="previewGlyph"
        />
      </div>
      <!-- <div class="glyphs">
        <GlyphPreview
          v-for="(glyph, i) in font.glyphs.glyphs"
          :key="'glyph' + i"
          :font="font"
          :glyph="glyph"
        />
      </div> -->
    </template>
    <div
      v-else
      class="dropzone"
    >
      <span>Drop a font to get started</span>
    </div>
  </div>
</template>

<script>
import opentype from 'opentype.js'
import FontHeader from './components/FontHeader.vue'
import GlyphPreview from './components/GlyphPreview.vue'
import * as db from 'idb-keyval'

export default {
  components: {
    FontHeader,
    GlyphPreview,
  },
  data() {
    return {
      previewGlyph: null,
      font: null,
    };
  },
  watch: {
    font() {
      const previewUnicode = '3'.charCodeAt()
      this.previewGlyph = Object.values(this.font.glyphs.glyphs).find(i => i.unicode === previewUnicode)
    },
  },
  async created() {
    const stored = await db.get('font')
    if (stored) {
      this.loadFont(stored)
    }
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
  },
  methods: {
    async dropHandler(ev) {
      let droppedFiles = ev.dataTransfer.files
      if(!droppedFiles) return

      const fr = new FileReader()
      fr.onload = async () => {
        this.loadFont(fr.result)
      }
      fr.readAsArrayBuffer(droppedFiles[0])
    },
    async loadFont(arr) {
      try {
        this.font = await opentype.parse(arr)
        await db.set('font', arr)
      } catch(err) {
        console.log('err', err);
      }
    }
  }
}
</script>

<style>
html, body {
  background: #f4f4f4;
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.glyphs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);
}
.dropzone {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
