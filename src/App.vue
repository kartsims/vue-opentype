<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <canvas id="canvas"></canvas>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import opentype from 'opentype'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
    async loadFont() {
      try {
        const font = await opentype.load('momcake.otf')
              // Now let's display it on a canvas with id "canvas"
        const ctx = document.getElementById('canvas').getContext('2d');

        // Construct a Path object containing the letter shapes of the given text.
        // The other parameters are x, y and fontSize.
        // Note that y is the position of the baseline.
        const path = font.getPath('Hello, World!', 0, 150, 72);
        console.log('path', path)

        // If you just want to draw the text you can also use font.draw(ctx, text, x, y, fontSize).
        path.draw(ctx);
      } catch(err) {
        console.log('err', err);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
