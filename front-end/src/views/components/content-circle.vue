<!-- CircleDots.vue -->
<template>
  <div class="dot-container">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="dot"
      :style="{
        width: `${dotSize * 3}px`,
        height: `${dotSize}px`,
        transform: `translateX(${
          radius * Math.cos((index * 30 * Math.PI) / 180) - (dotSize * 3) / 2
        }px) translateY(${
          radius * Math.sin((index * 30 * Math.PI) / 180) - dotSize / 2
        }px)`,
      }"
    >
      <div class="content">{{ item.content }}</div>
      <div class="time">{{ item.time }}</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";

export default {
  name: "CircleContent",
  props: {
    items: {
      type: Array,
      required: true,
    },
    radius: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      dotSize: 30,
    });

    const dotRadius = computed(() => state.dotSize / 2);

    return {
      dotRadius,
      ...toRefs(state),
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
    display: flex;
    flex-direction: column;
    left: 50%;
    top: 50%;
  }

}
</style>
