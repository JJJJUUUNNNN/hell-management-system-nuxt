<template>
  <div>
    <n-drawer v-model:show="showDrawer" placement="right" :width="450" resizable
      :on-mask-click="() => (showDrawer = true)">
      <n-drawer-content title="创建用户" closable>
        <n-form ref="formRef" :label-width="80" label-placement="left" :model="userData" :rules="userRules">
          <n-form-item label="图片" path="image">
            <n-upload action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f" list-type="image-card"
              @preview="handlePreview" :default-file-list="userData.image" />
          </n-form-item>
          <n-form-item label="姓名" path="name">
            <n-input v-model:value="userData.name" placeholder="请输入姓名" />
          </n-form-item>
          <n-form-item label="年龄" path="age">
            <n-input v-model:value="userData.age" placeholder="请输入年龄" />
          </n-form-item>
          <n-form-item label="出生日期" path="birthDate">
            <n-date-picker class="w-100%" clearable v-model:formatted-value="userData.birthDate"
              value-format="yyyy-MM-dd" type="date" placeholder="请选择出生日期" />
          </n-form-item>
          <n-form-item label="死亡日期" path="deathDate">
            <n-date-picker class="w-100%" clearable v-model:formatted-value="userData.deathDate"
              value-format="yyyy-MM-dd" type="date" placeholder="请选择死亡日期" />
          </n-form-item>
        </n-form>
        <template #footer>
          <n-flex>
            <n-button @click="handleValidateClick" type="primary">
              确定
            </n-button>
            <n-button @click="showDrawer = false" type="warning">
              取消
            </n-button>
          </n-flex>
        </template>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<script setup lang="ts">
import { useMessage, type UploadFileInfo } from "naive-ui";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  updateType: {
    type: String,
    default: ""
  },
  data: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:visible', 'fetchList'])

const message = useMessage();

const userData = ref<Record<string, any>>({
  image: ["https://img-test.fbzs.net/uploads/jpg/20240711/D9oqvH73c3yAMd0OgGTCnOiynx0QVs59v9313lWt.jpg"],
  name: "",
  age: "",
  birthDate: null,
  deathDate: null,
});

const showDrawer = computed({
  get() {
    return props.visible
  },
  set(val) {
    emit("update:visible", val)
  }
})

const userRules = ref({
  // image: {
  //   required: true,
  //   trigger: ["change"],
  //   message: "请上传图片",
  // },
  name: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入姓名",
  },
  age: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入年龄",
  },
  birthDate: {
    required: true,
    trigger: ["blur", "change"],
    message: "请选择出生日期",
  },
  deathDate: {
    required: true,
    trigger: ["blur", "change"],
    message: "请选择死亡日期",
  },
});

const previewImageUrlRef = ref('')
const formRef = ref();

function handlePreview(file: UploadFileInfo) {
  const { url } = file
  previewImageUrlRef.value = url as string
}

function handleValidateClick(e: MouseEvent) {
  e.preventDefault();
  const messageReactive = message.loading("Verifying", {
    duration: 0,
  });
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      const res: Array<Object> = props.updateType == 'add' ? await $fetch("/api/lifeDeathBook/userManage/add", {
        method: "post",
        body: userData.value,
      }) : await $fetch("/api/lifeDeathBook/userManage/update", {
        method: "post",
        body: userData.value,
      });
      message.success('操作成功')
      emit('fetchList')
      showDrawer.value = false
    } else {
      message.error("Invalid");
    }
    messageReactive.destroy();
  });
}

watch([() => () => props.visible, props.data], (val) => {
  if (val[0] && val[1]) {
    userData.value = val[1]
  }
})
</script>

<style scoped></style>