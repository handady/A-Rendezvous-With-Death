<template>
  <div id="index">
    <div
      class="center-line"
      :style="{
        top: topDistance + 'px',
        height: `calc(100% - ${topDistance}px)`,
      }"
    ></div>
    <div
      class="timeline"
      :style="{
        height: dotDiameter + 'px',
        width: dotDiameter + 'px',
        top: topDistance + 'px',
      }"
    >
      <div
        class="circle"
        :style="{ height: dotDiameter + 'px', width: dotDiameter + 'px' }"
      ></div>
      <CircleDots
        :items="items"
        :radius="dotRadius"
        :dotSize="dotSize"
        :circleAngle="circleAngle"
      />
      <CircleContent
        :items="items"
        :radius="contentRadius"
        :circleAngle="circleAngle"
      />
    </div>
    <LineDots
      :items="lineItems"
      :dotSize="dotSize"
      :topDistance="contentDiameter + topDistance"
      :dotSpacing="dotSpacing"
      @updateItems="updateItems"
      @scrollDistance="handleScrollDistance"
    />
    <sider @addCollection="addCollection" />
    <add
      :dialogVisible="dialogVisible"
      @closeDialog="closeDialog"
      @addCardSuccess="addCardSuccess"
    ></add>
  </div>
</template>

<script>
import { reactive, toRefs, computed, onMounted, onUnmounted } from "vue";
import CircleDots from "./components/dot-circle.vue";
import CircleContent from "./components/content-circle.vue";
import LineDots from "./components/dot-line.vue";
import sider from "@/components/common/sider.vue";
import add from "@/components/common/add.vue";

export default {
  name: "index",
  components: {
    CircleDots,
    CircleContent,
    LineDots,
    sider,
    add,
  },
  setup() {
    // 初始化数据
    const state = reactive({
      items: [
        { color: "rgba(255,105,180)", time: "2019-11-01", content: "content1" },
        { color: "green", time: "2019-11-02", content: "content2" },
        { color: "blue", time: "2019-11-03", content: "content3" },
        { color: "red", time: "2019-11-04", content: "content4" },
        { color: "green", time: "2019-11-05", content: "content5" },
        { color: "blue", time: "2019-11-06", content: "content6" },
        { color: "red", time: "2019-11-07", content: "content7" },
        { color: "green", time: "2019-11-08", content: "content8" },
        { color: "blue", time: "2019-11-09", content: "content9" },
        { color: "red", time: "2019-11-10", content: "content10" },
        { color: "green", time: "2019-11-11", content: "content11" },
        { color: "blue", time: "2019-11-12", content: "content12" },
      ],
      lineItems: [],
      dotDiameter: 240, // 圆点直径
      contentDiameter: 330, // 内容直径
      dotSize: 12, // 圆点大小
      topDistance: 70, // 顶部间距
      circleAngle: 0, // 圆环旋转角度
      dotSpacing: 50, // 圆点间距
      dialogVisible: false, // 弹窗状态
    });

    // 圆点半径
    const dotRadius = computed(() => state.dotDiameter / 2);
    // 内容半径
    const contentRadius = computed(() => state.contentDiameter / 2);
    // 每个像素转的角度
    const degreesPerPixel = computed(
      () => 30 / (state.dotSize + state.dotSpacing)
    );

    // 更新数据
    const updateItems = (item) => {
      console.log("updateItems", item);
    };

    // 滚动距离
    const handleScrollDistance = (distance) => {
      // 计算旋转角度 62px转30度
      const angle = distance * degreesPerPixel.value;
      state.circleAngle = angle;
    };

    // 弹窗-------------------------------------------------
    // 打开弹窗
    const addCollection = () => {
      console.log("addCollection");
      state.dialogVisible = true;
    };
    const closeDialog = () => {
      state.dialogVisible = false;
    };
    const addCardSuccess = () => {
      console.log("addCardSuccess");
    }
    // 初始化
    const loadData = () => {
      // window.electronAPI.send("loadData");
      // window.electronAPI.receive("loadDataResponse", (data) => {
      //   state.lineItems = data;
      // });
      setTimeout(() => {
        state.lineItems = [
          {
            color: "rgba(255,105,180)",
            time: "2019-11-01",
            content: "content1",
          },
          { color: "green", time: "2019-11-02", content: "content2" },
          { color: "blue", time: "2019-11-03", content: "content3" },
          { color: "red", time: "2019-11-04", content: "content4" },
          { color: "green", time: "2019-11-05", content: "content5" },
          { color: "blue", time: "2019-11-06", content: "content6" },
          { color: "red", time: "2019-11-07", content: "content7" },
          { color: "green", time: "2019-11-08", content: "content8" },
          { color: "blue", time: "2019-11-09", content: "content9" },
        ];
      }, 1000);
    };

    onMounted(() => {
      loadData();
    });
    onUnmounted(() => {
      // window.electronAPI.removeAllListeners("loadDataResponse");
    });

    return {
      ...toRefs(state),
      dotRadius,
      contentRadius,
      updateItems,
      handleScrollDistance,
      addCollection,
      closeDialog,
      addCardSuccess,
    };
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
  user-select: none;

  .center-line {
    width: 2px;
    background-color: #c2b29a;
    position: absolute;
  }

  .timeline {
    position: relative;

    .circle {
      border-radius: 50%;
      border: 2px solid #c2b29a;
    }
  }
}
</style>
