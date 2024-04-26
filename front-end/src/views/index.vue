<template>
  <div id="index">
    <div class="center-line"></div>
    <div
      class="timeline"
      :style="{ height: diameter + 'px', width: diameter + 'px' }"
    >
      <div
        class="circle"
        :style="{ height: diameter + 'px', width: diameter + 'px' }"
      ></div>
      <CircleDots :items="items" :radius="radius" :dotSize="dotSize" />
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";
import CircleDots from "./components/dot-circle.vue";

export default {
  name: "index",
  components: {
    CircleDots,
  },
  setup() {
    const state = reactive({
      items: [
        { color: "rgba(255,105,180)" },
        { color: "green" },
        { color: "blue" },
        { color: "red" },
        { color: "green" },
        { color: "blue" },
        { color: "red" },
        { color: "green" },
        { color: "blue" },
        { color: "red" },
        { color: "green" },
        { color: "blue" },
      ],
      diameter: 240,
      dotSize: 12,
    });

    const radius = computed(() => state.diameter / 2);

    return { ...toRefs(state), radius };
  },
};
</script>

<style lang="scss" scoped>
#index {
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
  overflow: hidden;

  .center-line {
    width: 2px;
    height: calc(100% - 20px);
    margin-top: 20px;
    background-color: #c2b29a;
    position: absolute;
  }

  .timeline {
    position: relative;
    margin-top: 20px;

    .circle {
      border-radius: 50%;
      border: 2px solid #c2b29a;
    }
  }
}
</style>
