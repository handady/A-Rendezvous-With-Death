<template>
  <div class="vditor-element" ref="vditorElementRef">
    <div v-if="isEditing" @dblclick.stop>
      <div :id="vditorId" class="vditor" ref="vditorRef"></div>
    </div>
    <div v-else class="draggable" ref="previewContainer"></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import Vditor from "vditor";
import "vditor/dist/index.css";

export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const isEditing = ref(false);
    const vditor = ref(null);
    const vditorRef = ref(null);
    const editableContent = ref(props.content);
    const vditorId = ref(props.data.date);
    const previewContainer = ref(null);
    const vditorElementRef = ref(null);

    const initVditor = async () => {
      await nextTick();
      vditor.value = new Vditor(vditorId.value, {
        toolbar: [
          "ordered-list",
          "check",
          "upload", // 如果需要上传图片功能
        ],
        cache: { id: "vditor" },
        value: editableContent.value,
        after: () => {
          updateVditorSize();
          console.log("Editor is ready");
        },
        blur: () => {
          handleBlur();
        },
      });
    };

    const editContent = () => {
      isEditing.value = true;
      initVditor();
    };

    const handleBlur = () => {
      saveContent();
    };

    const saveContent = () => {
      if (vditor.value) {
        console.log(vditor.value.getValue());
        editableContent.value = vditor.value.getValue();
        vditor.value.destroy();
        vditor.value = null;
      }
      isEditing.value = false;
      renderPreview();
      emit("update:content", editableContent.value);
    };

    const renderPreview = async () => {
      await nextTick();
      if (previewContainer.value) {
        Vditor.preview(previewContainer.value, editableContent.value, {
          after() {
            console.log("Preview is ready");
          },
        });
      }
    };

    const updateVditorSize = () => {
      if (vditorElementRef.value && vditorRef.value) {
        const newWidth = vditorElementRef.value.offsetWidth - 20;
        const newHeight = vditorElementRef.value.offsetHeight - 20;
        const vditorElement = vditorRef.value;
        if (vditorElement) {
          vditorElement.style.width = `${newWidth}px`;
          vditorElement.style.height = `${newHeight}px`;
        }
      }
    };

    let resizeObserver;

    onMounted(() => {
      renderPreview();
      resizeObserver = new ResizeObserver(() => {
        updateVditorSize();
      });
      if (vditorElementRef.value) {
        resizeObserver.observe(vditorElementRef.value);
      }
    });

    onBeforeUnmount(() => {
      if (vditor.value) {
        vditor.value.destroy();
      }
      if (resizeObserver && vditorElementRef.value) {
        resizeObserver.unobserve(vditorElementRef.value);
      }
    });

    return {
      isEditing,
      vditor,
      editContent,
      saveContent,
      editableContent,
      vditorId,
      previewContainer,
      handleBlur,
      vditorElementRef,
      vditorRef,
    };
  },
};
</script>

<style scoped>
.draggable {
  padding: 10px;
}

:deep(.vditor-reset) {
  width: 100%;
  height: 100%;
}

.vditor {
  width: 100%;
  height: 100%;
}
</style>
