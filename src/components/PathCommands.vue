<template>
  <g>
    <g
      v-for="(cmd, i) in path.commands"
      :key="i"
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
</template>

<script>
export default {
  props: {
    path: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
