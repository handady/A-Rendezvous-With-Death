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
  watch,
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
    dotSize: {
      type: Number,
      default: 10,
    },
    topDistance: {
      type: Number,
      default: 100,
    },
    dotSpacing: {
      type: Number,
      default: 50,
    },
  },
  emits: ["updateItems", "scrollDistance"],
  setup(props, { emit }) {
    let isLoading = false;
    // 容器
    const container = ref(null);
    // 计算圆点的半径
    const dotRadius = computed(() => props.dotSize / 2);

    // 拖动滚动 ------------------------------------------------------------
    const isDragging = ref(false);
    const startY = ref(0);
    const scrollStartY = ref(0);
    // 当鼠标按下时初始化拖动
    const onMouseDown = (event) => {
      isDragging.value = true;
      startY.value = event.clientY;
      scrollStartY.value = container.value.scrollTop;
    };
    // 处理鼠标移动事件
    const onMouseMove = (event) => {
      if (isDragging.value && !isLoading) {
        const deltaY = event.clientY - startY.value;
        container.value.scrollTop = scrollStartY.value - deltaY;
      }
    };
    // 鼠标释放时停止拖动
    const onMouseUp = () => {
      isDragging.value = false;
    };
    // 拖动滚动 ------------------------------------------------------------

    const prependItems = async () => {
      // 获取当前的 scrollTop 和 scrollHeight
      const oldScrollTop = container.value.scrollTop;
      const oldScrollHeight = container.value.scrollHeight;

      // 等待 DOM 更新
      await nextTick();

      // 调整滚动条，保持原有视图位置
      container.value.scrollTop =
        oldScrollTop + (container.value.scrollHeight - oldScrollHeight);
      scrollStartY.value = container.value.scrollTop;
    };

    const checkScroll = () => {
      if (container.value && !isLoading) {
        const currentScrollTop = container.value.scrollTop;
        const scrollHeight = container.value.scrollHeight;
        const clientHeight = container.value.clientHeight;
        const distanceToBottom = scrollHeight - currentScrollTop - clientHeight;
        emit("scrollDistance", distanceToBottom); // 发送距离底部的距离到父组件

        if (currentScrollTop <= 50) {
          isLoading = true;
          prependItems().then(() => {
            isLoading = false;
          });
        }
      }
    };

    const throttledCheckScroll = throttle(checkScroll, 20);

    onMounted(() => {
      container.value = document.querySelector("#line-dots .dot-container");
      if (container.value) {
        container.value.addEventListener("scroll", throttledCheckScroll);
        container.value.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
      }
    });

    onUnmounted(() => {
      if (container.value) {
        container.value.removeEventListener("scroll", throttledCheckScroll);
        container.value.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      }
    });

    // 滚动到底部
    const scrollToBottom = () => {
      if (container.value) {
        container.value.scrollTop = container.value.scrollHeight;
      }
    };

    // 监听items变化
    watch(
      () => props.items,
      (newItems) => {
        if (newItems.length > 0) {
          scrollToBottom(); // 初始滚动到底部
        }
      }
    );

    return {
      dotRadius,
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
    cursor: pointer;

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
