<template>
  <div class="dot-container">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="dot"
      :style="dotStyle(item, index)"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
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
  circleAngle: {
    type: Number,
    default: 0,
  },
});

// 计算每个点的位置
const dotStyle = (item, index) => {
  const radian = ((props.circleAngle + index * 30) * Math.PI) / 180;
  const x = props.radius * Math.cos(radian) - props.dotSize / 2;
  const y = props.radius * Math.sin(radian) - props.dotSize / 2;
  return {
    backgroundColor: item.color,
    width: `${props.dotSize}px`,
    height: `${props.dotSize}px`,
    transform: `translate(${x}px, ${y}px)`,
  };
};
</script>

<style scoped>
.dot-container {
  position: relative;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dot {
  position: absolute;
  border-radius: 50%;
  top: -30%;
  left: 50%;
}
</style>
