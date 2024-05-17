<template>
  <div class="canvas-container">
    <v-stage :config="config" @dblclick="addHtmlElement">
      <v-layer> </v-layer>
    </v-stage>
    <!-- HTML 叠加层 -->
    <div class="html-overlay">
      <VditorElement
        v-for="(element, index) in htmlElements"
        :key="index"
        :content="element.content"
        :data="element"
        :style="element.style"
        :ref="element.date"
        class="draggable"
        v-draggable
        @update:content="updateContent(index, $event)"
        @dblclick="editContent(element.date)"
      />
    </div>
  </div>
</template>

<script>
import { ref, getCurrentInstance, watch } from "vue";
import { Stage, Layer } from "vue-konva";
import draggable from "@/utils/draggable.ts";
import VditorElement from "./VditorElement.vue";
import { cloneDeep } from "lodash";

export default {
  name: "Canvas",
  components: {
    "v-stage": Stage,
    "v-layer": Layer,
    VditorElement,
  },
  props: {
    dialogWidth: {
      type: Number,
      default: 0,
    },
    dialogHeight: {
      type: Number,
      default: 0,
    },
    currentHtmlElements: {
      type: Array,
      default: () => [],
    },
    currentItem: {
      type: Object,
      default: () => ({}),
    }
  },
  directives: {
    draggable,
  },
  setup(props, { emit }) {
    const config = ref({
      width: props.dialogWidth,
      height: props.dialogHeight,
    });

    const htmlElements = ref(cloneDeep(props.currentHtmlElements));

    let newHtmlElement = cloneDeep(htmlElements.value);

    const { proxy } = getCurrentInstance();

    const updateContent = (index, newContent) => {
      htmlElements.value[index].content = newContent;
      const child = proxy.$refs[htmlElements.value[index].date][0];
      // 获取child的样式，宽高,transform,top,left
      if (child) {
        newHtmlElement[index].style.width = child.$el.style.width;
        newHtmlElement[index].style.height = child.$el.style.height;
        newHtmlElement[index].style.top = child.$el.style.top;
        newHtmlElement[index].style.left = child.$el.style.left;
        newHtmlElement[index].style.transform = child.$el.style.transform;
      }
      console.log(newHtmlElement);
    };

    const editContent = (refValue) => {
      const child = proxy.$refs[refValue][0];
      if (child) {
        child.editContent();
      }
    };

    function formatDate(date) {
      const pad = (num) => String(num).padStart(2, "0");
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    // 添加元素
    const addHtmlElement = (event) => {
      const { offsetX, offsetY } = event.evt;
      const newElement = {
        content: "",
        date: formatDate(new Date()), // 使用自定义的格式化函数
        style: {
          position: "absolute",
          top: `${offsetY}px`,
          left: `${offsetX}px`,
          width: "200px",
          height: "128px",
          minHeight: "128px",
        },
      };
      htmlElements.value.push(newElement);
      newHtmlElement = cloneDeep(htmlElements.value); // 更新深拷贝副本
    };

    // 保存元素
    const saveCanvas = () => {
      let newCurrentItem = cloneDeep(props.currentItem);
      newCurrentItem.htmlElements = newHtmlElement;
      console.log("saveCanvas", newCurrentItem);
    };

    watch(
      () => [props.dialogWidth, props.dialogHeight, props.currentHtmlElements],
      ([newWidth, newHeight, newElements]) => {
        config.value.width = newWidth;
        config.value.height = newHeight - 40;
        htmlElements.value = cloneDeep(newElements);
      },
      { immediate: true, deep: true }
    );

    return {
      config,
      htmlElements,
      updateContent,
      editContent,
      addHtmlElement,
      saveCanvas,
    };
  },
};
</script>

<style scoped>
.canvas-container {
  position: relative;

  .draggable {
    pointer-events: auto; /* 使得 HTML 元素可交互 */
    cursor: move;
    background-color: #f5f5f5;
    border-radius: 6px;
  }
}

.html-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 确保 Konva 画布事件不受影响 */
}
</style>
