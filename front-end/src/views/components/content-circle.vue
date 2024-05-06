<template>
  <div class="dot-container">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="dot"
      :style="dotStyle(index)"
    >
      <div class="content">{{ item.content }}</div>
      <div class="time">{{ item.time }}</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, onUnmounted, ref } from "vue";

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
    circleAngle: {
      type: Number,
      default: 0,
    }
  },
  setup(props) {
    const state = reactive({
      dotSize: 30,
    });

    // 计算样式
    const dotStyle = (index) => {
      const radian = ((index * 30 + props.circleAngle) * Math.PI) / 180;
      const x = props.radius * Math.cos(radian) - (state.dotSize * 3) / 2;
      const y = props.radius * Math.sin(radian) - state.dotSize / 2;
      return {
        width: `${state.dotSize * 3}px`,
        height: `${state.dotSize}px`,
        transform: `translateX(${x}px) translateY(${y}px)`,
      };
    };

    return {
      ...toRefs(state),
      dotStyle,
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
  transform-origin: center center; /* 确保旋转中心在容器中心 */

  .dot {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    left: 50%;
    top: 50%;
  }
}
</style>
