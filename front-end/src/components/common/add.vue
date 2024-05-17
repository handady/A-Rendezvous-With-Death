<template>
  <div id="add">
    <el-dialog
      v-model="dialogVisibleChild"
      :show-close="false"
      draggable
      width="50%"
      :before-close="closeDialog"
    >
      <div class="content" ref="canvasRef">
        <img src="../../assets/images/add.jpg" alt="" />
        <div class="addForm">
          <el-form ref="addForm" :model="formData" label-position="top">
            <Canvas
              :dialogWidth="dialogWidth"
              :dialogHeight="dialogHeight"
              :key="canvasKey"
              :currentHtmlElements="currentItem.htmlElements"
              :currentItem="currentItem"
              ref="canvasChildRef"
            ></Canvas>
            <!-- 按钮 -->
            <el-form-item class="btnBox">
              <el-button class="closeBtn" @click="closeDialog">关闭</el-button>
              <el-button class="resetBtn" @click="reset">重置</el-button>
              <el-button class="submitBtn" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { nextTick, reactive, ref, watch, getCurrentInstance } from "vue";
import { ElMessage } from "element-plus";
import Canvas from "./Canvas.vue";

export default {
  name: "add",
  components: {
    Canvas,
  },
  props: {
    dialogVisible: {
      //弹窗状态
      type: Boolean,
      default: false,
    },
    currentItem: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    const dialogVisibleChild = ref(false);
    const canvasRef = ref(null); //dialog的引用
    const dialogWidth = ref(0); //dialog的宽
    const dialogHeight = ref(0); //dialog的高
    const canvasKey = ref(0);
    const { proxy } = getCurrentInstance();

    //表单数据
    const formData = reactive({
      title: "",
      content: "",
      createDate: "",
    });
    //关闭表单弹窗
    const closeDialog = () => {
      emit("closeDialog", false);
    };
    //重置表单
    const reset = () => {
      formData.name = "";
      formData.class = "";
      formData.description = "";
      formData.type = "";
      formData.creator = "";
      formData.rate = "";
    };
    //提交表单数据
    const onSubmit = () => {
      const child = proxy.$refs.canvasChildRef;
      console.log(child);
      if (child) {
        child.saveCanvas();
      }
      ElMessage({
        showClose: true,
        message: "卡片添加成功！",
        type: "success",
        center: true,
      });
      // closeDialog();
      // emit("addCardSuccess");
    };

    watch(
      () => [props.dialogVisible, props.currentItem],
      ([newDialogVisible, newCurrentItem]) => {
        dialogVisibleChild.value = newDialogVisible;
        if (newDialogVisible) {
          nextTick(() => {
            const dialog = canvasRef.value;
            if (dialog) {
              dialogWidth.value = dialog.offsetWidth;
              dialogHeight.value = (dialog.offsetWidth * 810) / 1345;
            }
          });
        }
        // 改变 key 来强制重新渲染 Canvas 组件
        canvasKey.value++;
      },
      { deep: true }
    );

    return {
      closeDialog,
      formData,
      onSubmit,
      reset,
      dialogVisibleChild,
      canvasRef,
      dialogWidth,
      dialogHeight,
      canvasKey,
    };
  },
  emits: ["closeDialog"],
};
</script>

<style scoped>
:deep(.el-dialog) {
  border-radius: 10px;
  overflow: hidden;
  padding: 0;
}
:deep(.el-dialog__body) {
  padding: 0;
}
:deep(.el-dialog__header) {
  position: absolute;
  width: calc(100% - 40px);
}
:deep(.el-form-item__label) {
  color: #fff;
  font-size: 16px;
}
:deep(.btnBox .el-form-item__content) {
  display: flex;
  justify-content: space-between;
}
:deep(.el-textarea__inner) {
  height: 70px;
}
.content {
  background-image: url("../../assets/images/add.jpg");
  background-size: 125%;
  background-repeat: no-repeat;
  background-position: 25% 40%;
  position: relative;
}
.content img {
  width: 100%;
  height: 100%;
  visibility: hidden;
}
.addForm {
  /* background-color: red; */
  position: absolute;
  width: calc(100% - 80px);
  top: 50%;
  transform: translateY(-50%);
  margin: 0 40px;
}
.submitBtn {
  background-color: #fec2d6;
  border: 0;
  font-family: "heiseqingren";
  width: 30%;
}
.submitBtn:hover {
  background-color: #f5347f;
  color: white;
}
.resetBtn {
  background-color: #fffacd;
  border: 0;
  font-family: "heiseqingren";
  width: 30%;
}
.resetBtn:hover {
  background-color: #ffd700;
  color: white;
}
.closeBtn {
  background-color: #bfefff;
  border: 0;
  font-family: "heiseqingren";
  width: 30%;
}
.closeBtn:hover {
  background-color: #00bfff;
  color: white;
}
</style>
