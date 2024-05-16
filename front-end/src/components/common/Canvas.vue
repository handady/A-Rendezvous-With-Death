<template>
  <div class="canvas-container">
    <v-stage :config="config">
      <v-layer>
        <v-rect
          v-for="(rect, index) in rects"
          :key="index"
          :config="rect.config"
        />
      </v-layer>
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
import { Stage, Layer, Rect } from "vue-konva";
import draggable from "@/utils/draggable.ts";
import VditorElement from "./VditorElement.vue";

export default {
  name: "Canvas",
  components: {
    "v-stage": Stage,
    "v-layer": Layer,
    "v-rect": Rect,
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
  },
  directives: {
    draggable,
  },
  setup(props, { emit }) {
    const config = ref({
      width: props.dialogWidth,
      height: props.dialogHeight,
    });

    const rects = ref([
      {
        config: {
          x: 20,
          y: 20,
          width: 100,
          height: 100,
          fill: "red",
          draggable: true,
        },
      },
    ]);

    const htmlElements = ref([
      {
        content: "",
        date: "2020-01-01 00:00:00",
        style: {
          position: "absolute",
          top: "200px",
          left: "50px",
          width: "400px",
        },
      },
      {
        content: "",
        date: "2020-01-02 00:00:00",
        style: {
          position: "absolute",
          top: "300px",
          left: "150px",
          width: "300px",
        },
      },
    ]);

    const updateContent = (index, newContent) => {
      htmlElements.value[index].content = newContent;
      console.log(htmlElements.value);
    };

    const { proxy } = getCurrentInstance();

    const editContent = (refValue) => {
      const child = proxy.$refs[refValue][0];
      if (child) {
        child.editContent();
      }
    };

    watch(
      () => [props.dialogWidth, props.dialogHeight],
      ([newWidth, newHeight]) => {
        config.value.width = newWidth;
        config.value.height = newHeight - 40;
      }
    );

    return { config, rects, htmlElements, updateContent, editContent };
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
