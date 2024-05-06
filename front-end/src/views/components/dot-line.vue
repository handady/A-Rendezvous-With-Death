<!-- CircleDots.vue -->
<template>
  <div id="line-dots">
    <div
      class="dot-container"
      :style="{
        top: `${topDistance}px`,
        height: `calc(95% - ${topDistance}px)`,
      }"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        class="dot"
        :style="{
          transform: `translateY(${index * (dotSize + dotSpacing)}px)`,
        }"
      >
        <div
          class="left"
          :style="{
            backgroundColor: item.color,
            width: `${dotSize}px`,
            height: `${dotSize}px`,
          }"
        ></div>
        <div class="right">
          <div class="content">{{ item.content }}</div>
          <div class="time">{{ item.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  reactive,
  toRefs,
  onMounted,
  onUnmounted,
  ref,
  defineComponent,
  nextTick,
} from "vue";
import { throttle } from "lodash";

export default defineComponent({
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
  emits: ["updateItems"],
  setup(props, { emit }) {
    const state = reactive({
      dotSpacing: 50,
    });
    // 容器
    const container = ref(null);
    // 计算圆点的半径
    const dotRadius = computed(() => props.dotSize / 2);

    const prependItems = async () => {
      // 获取当前的 scrollTop 和 scrollHeight
      const oldScrollTop = container.value.scrollTop;
      const oldScrollHeight = container.value.scrollHeight;

      // 模拟新数据
      const newItems = [
        {
          id: Date.now(),
          content: "New item at " + new Date().toLocaleTimeString(),
        },
        ...props.items,
      ];

      // 更新数据
      emit("updateItems", newItems);

      // 等待 DOM 更新
      await nextTick();
      // element-ui怎么修改placeholder的颜色

      // 调整滚动条，保持原有视图位置
      container.value.scrollTop =
        oldScrollTop + (container.value.scrollHeight - oldScrollHeight);
    };

    // 滚动到底部
    const scrollToBottom = () => {
      if (container.value) {
        container.value.scrollTop = container.value.scrollHeight;
      }
    };

    const checkScroll = () => {
      if (container.value) {
        console.log("container.scrollTop", container.value.scrollTop);
        if (container.value.scrollTop === 0) {
          console.log("Reached Top");
          prependItems();
        }
      }
    };

    const throttledCheckScroll = throttle(checkScroll, 100);

    onMounted(() => {
      container.value = document.querySelector("#line-dots .dot-container");
      if (container.value) {
        container.value.addEventListener("scroll", throttledCheckScroll);
        scrollToBottom(); // 初始滚动到底部
      }
    });

    onUnmounted(() => {
      if (container.value) {
        container.value.removeEventListener("scroll", throttledCheckScroll);
      }
    });

    return {
      dotRadius,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
#line-dots {
  .dot-container {
    position: absolute;
    left: calc(50% - 5px);
    transform: translateX(-50%);
    width: 30%;
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox 浏览器隐藏滚动条 */

    &::-webkit-scrollbar {
      display: none; /* Chrome、Safari 和 Opera 浏览器隐藏滚动条 */
    }

    .dot {
      position: absolute;
      left: 50%;
      display: flex;
      align-items: center;

      .left {
        border-radius: 50%;
      }
      .right {
        margin-left: 25px;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>
