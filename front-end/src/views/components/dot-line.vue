<!-- CircleDots.vue -->
<template>
  <div id="line-dots">
    <div
      class="dot-container"
      :style="{
        top: `${topDistance}px`,
        height: `calc(100% - ${topDistance}px)`,
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
import { computed, reactive, toRefs, onMounted, onUnmounted } from "vue";

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

    const prependItems = () => {
      // 这里模拟添加新数据到数组顶部
      const newItem = {
        color: "blue",
        content: "新增内容",
        time: new Date().toLocaleTimeString(),
      };
      // 发送数据到父组件
      //   this.$emit("prependItems", newItem);
    };

    // 滚动到底部
    const scrollToBottom = () => {
      const container = document.querySelector("#line-dots .dot-container");
      container.scrollTop = container.scrollHeight;
    };

    const checkScroll = () => {
      const container = document.querySelector("#line-dots .dot-container");
      console.log("container.scrollTop", container.scrollTop);
      if (container.scrollTop <= 10) {
        // 这里可以触发加载更多内容的方法
        console.log("Reached Top");
      }
    };

    onMounted(() => {
      scrollToBottom(); // 初始滚动到底部
      const container = document.querySelector("#line-dots .dot-container");
      container.addEventListener("scroll", checkScroll);
    });

    onUnmounted(() => {
      const container = document.querySelector("#line-dots .dot-container");
      container.removeEventListener("scroll", checkScroll);
    });

    return {
      dotRadius,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
#line-dots {
  .dot-container {
    position: absolute;
    left: -5px;
    width: 100%;
    overflow-y: scroll;

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
