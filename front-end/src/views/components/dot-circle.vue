<!-- CircleDots.vue -->
<template>
  <div class="dot-container">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="dot"
      :style="{
        backgroundColor: item.color,
        width: `${dotSize}px`,
        height: `${dotSize}px`,
        transform: `translateX(${
          radius * Math.cos((index * 30 * Math.PI) / 180) - dotSize / 2
        }px) translateY(${
          radius * Math.sin((index * 30 * Math.PI) / 180) - dotSize / 2
        }px)`,
      }"
    ></div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "CircleDots",
  props: {
    items: {
      type: Array,
      required: true,
    },
    radius: {
      type: Number,
      required: true,
    },
    dotSize: {
      type: Number,
      default: 10,
    },
  },
  setup(props) {
    const dotRadius = computed(() => props.dotSize / 2);

    return {
      dotRadius,
    };
  },
};
</script>

<style lang="scss" scoped>
.dot-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .dot {
    position: absolute;
    border-radius: 50%;
    left: 50%;
    top: 50%;
  }
}
</style>
