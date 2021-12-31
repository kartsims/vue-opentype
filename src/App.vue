<template>
  <div
    id="app"
    v-cloak
    @drop.prevent="dropHandler"
    @dragover.prevent
  >
    <FontHeader :font="font"/>
    <header>
      <button
        v-for="font in fontOptions"
        :key="font"
        v-text="font"
        @click="loadFontUrl(font)"
      />
    </header>
    <template v-if="font">
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
import FontHeader from './components/FontHeader.vue'
import GlyphPreview from './components/GlyphPreview.vue'

export default {
  components: {
    FontData,
    FontHeader,
    GlyphPreview,
  },
  data() {
    return {
      previewGlyph: null,
      font: null,
      fontOptions: [
        'alhambra.ttf',
        'UxumGrotesque-Medium.otf',
        'GiantMouse.ttf',
        'Pushster.ttf',
        'Lora-Italic.ttf',
        'momcake.otf',
      ],
    };
  },
  watch: {
    font() {
      const previewUnicode = '3'.charCodeAt()
      this.previewGlyph = Object.values(this.font.glyphs.glyphs).find(i => i.unicode === previewUnicode)
      console.log('this.previewGlyph', this.previewGlyph);
    },
  },
  created() {
    // this.loadFontUrl('GiantMouse.ttf')
    this.loadFontUrl('Lora-Italic.ttf')
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
        this.font = await opentype.parse(fr.result)
      }
      fr.readAsArrayBuffer(droppedFiles[0])
    },
    async loadFontUrl(filename) {
      try {
        this.font = await opentype.load(`fonts/${filename}`)
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
