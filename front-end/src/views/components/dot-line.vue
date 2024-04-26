<!-- CircleDots.vue -->
<template>
  <div class="dot-container" :style="{ top: `${topDistance+10}px` }">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="dot"
      :style="{
        backgroundColor: item.color,
        width: `${dotSize}px`,
        height: `${dotSize}px`,
        transform: `translateY(${index * (dotSize + dotSpacing)}px)`,
      }"
    ></div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";

export default {
  name: "LineDots",
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
    topDistance: {
      type: Number,
      default: 100,
    },
  },
  setup(props) {
    const state = reactive({
      dotSpacing: 50,
    });

    const dotRadius = computed(() => props.dotSize / 2);

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
  left: -5px;
  width: 100%;

  .dot {
    position: absolute;
    border-radius: 50%;
    left: 50%;
    top: 50%;
  }
}
</style>
