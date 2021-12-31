<template>
  <header>
    <h1>
      {{ font.names.fontFamily.en }}
      <span>{{ font.names.fontSubfamily.en }}</span>
    </h1>
    <a
      class="show-details"
      href="#0"
      @click.prevent="showDetails = !showDetails"
    >
      {{ showDetails ? 'Hide' : 'View' }} font details
    </a>
    <template v-if="showDetails">
      <div
        v-if="font.names.version"
        class="info"
      >
        {{ font.names.version.en }}
      </div>
      <div
        v-if="font.names.manufacturer"
        class="info"
      >
        Manufactured by: {{ font.names.manufacturer.en }}
      </div>
      <div
        v-if="font.names.designer"
        class="info"
      >
        Designed by: {{ font.names.designer.en }}
      </div>
      <div
        v-if="font.names.copyright"
        class="info"
      >
        {{ font.names.copyright.en }}
      </div>
    </template>
  </header>
</template>

<script>
export default {
  props: {
    font: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showDetails: false,
    }
  },
}
</script>

<style scoped>
header {
  padding-bottom: 2em;
}
h1 span {
  display: block;
  font-size: .5em;
}
.show-details {
  font-size: .7em;
}
</style>
