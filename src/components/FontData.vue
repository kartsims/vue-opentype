<template>
  <div>
    <pre>FONT DATA:
{{ data }}</pre>
  </div>
</template>

<script>
export default {
  props: {
    font: {
      type: Object,
      required: true,
    },
  },
  computed: {
    data() {
      return [
        {
          label: 'Glyphs',
          value: this.font.glyphs.length,
        },
        {
          label: 'Units per em',
          value: this.font.unitsPerEm,
        },
        {
          label: 'Ascender',
          value: this.font.ascender,
        },
        {
          label: 'Descender',
          value: this.font.descender,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
