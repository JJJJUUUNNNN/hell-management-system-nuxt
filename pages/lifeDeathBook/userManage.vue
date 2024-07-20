<template>
  <div class="m-5">
    <div class="card">
      <n-form ref="formRef" :model="formData" label-placement="left">
        <n-flex>
          <n-form-item path="name" label="姓名">
            <n-input v-model:value="formData.name" @keydown.enter.prevent placeholder="请输入姓名" clearable />
          </n-form-item>
          <!-- <n-form-item path="password" label="出生日期">
            <n-date-picker
              v-model:formatted-value="formData.birthDate"
              type="datetimerange"
              clearable
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              separator="至"
            />
          </n-form-item>
          <n-form-item path="password" label="死亡日期">
            <n-date-picker
              v-model:formatted-value="formData.deathDate"
              type="datetimerange"
              clearable
              value-format="yyyy.MM.dd HH:mm:ss"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              separator="至"
            />
          </n-form-item> -->
          <n-button :disabled="formData.name === null" :loading="searchLoading" round type="primary" @click="getList">
            搜索
          </n-button>
          <n-button :disabled="formData.name === null" round @click="handleReset">
            重置
          </n-button>
        </n-flex>
      </n-form>
    </div>
    <div class="card">
      <n-flex class="mb-5">
        <n-button :disabled="formData.name === null" :loading="searchLoading" round type="warning"
          @click="updateUser({}, 'add')">
          创建用户
        </n-button>
      </n-flex>
      <n-data-table :loading="searchLoading" :columns="columns" :data="tableData" :pagination="pagination"
        :row-key="rowKey" @update:checked-row-keys="handleCheck" />
    </div>
  </div>

  <n-modal v-model:show="showModal" preset="dialog" title="确认" positive-text="确认" negative-text="算了"
    @positive-click="handleDelete" @negative-click="showModal = false">
    <p>是否确定删除此条数据？</p>
  </n-modal>
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
          <n-date-picker class="w-100%" clearable v-model:formatted-value="userData.birthDate" value-format="yyyy-MM-dd"
            type="date" placeholder="请选择出生日期" />
        </n-form-item>
        <n-form-item label="死亡日期" path="deathDate">
          <n-date-picker class="w-100%" clearable v-model:formatted-value="userData.deathDate" value-format="yyyy-MM-dd"
            type="date" placeholder="请选择死亡日期" />
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
</template>

<script setup lang="ts">
import {
  NButton,
  NImage,
  useMessage,
  type UploadFileInfo,
  type FormItemRule,
  type DataTableColumns,
  type DataTableRowKey,
} from "naive-ui";
import type { Type } from "naive-ui/es/button/src/interface";
import type { RowData } from "naive-ui/es/data-table/src/interface";

interface QueryType {
  name?: any;
  birthDate?: Array<string> | null;
  deathDate?: Array<string> | null;
}

const formData = ref<QueryType>({
  name: "",
  // birthDate: null,
  // deathDate: null,
});

const formRef = ref();
const message = useMessage();
const columns = computed(() => createColumns());

const pagination = ref({
  pageSize: 5,
});

const showModal = ref(false);
const showDrawer = ref(false);
const userData = ref({
  image: ["https://img-test.fbzs.net/uploads/jpg/20240711/D9oqvH73c3yAMd0OgGTCnOiynx0QVs59v9313lWt.jpg"],
  name: "",
  age: "",
  birthDate: null,
  deathDate: null,
});

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

const btnList = [
  {
    type: 'error',
    click: (row: any) => showDele(row),
    name: '移除'
  },
  {
    type: 'warning',
    click: (row: any, type: string = 'edit') => updateUser(row, 'edit'),
    name: '编辑'
  }
]

const updateType = ref('')

function updateUser(row: any, type: string) {
  showDrawer.value = true;
  updateType.value = type
  userData.value = row
}

function handleValidateClick(e: MouseEvent) {
  e.preventDefault();
  const messageReactive = message.loading("Verifying", {
    duration: 0,
  });
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      const res: Array<Object> = updateType.value == 'add' ? await $fetch("/api/userList/add", {
        method: "post",
        body: userData.value,
      }) : await $fetch("/api/userList/update", {
        method: "post",
        body: userData.value,
      });
      message.success('操作成功')
      getList()
      showDrawer.value = false
    } else {
      message.error("Invalid");
    }
    messageReactive.destroy();
  });
}

function createColumns(): DataTableColumns<RowData> {
  return [
    {
      type: "selection",
      disabled: (row: RowData) => row.name == "66",
    },
    {
      title: "图片",
      key: "image",
      render(row) {
        return h(
          NImage,
          {
            width: 50,
            src: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
          },
          {
            default: () => row.image,
          }
        );
      },
    },
    {
      title: "姓名",
      key: "name",
    },
    {
      title: "年龄",
      key: "age",
    },
    {
      title: "出生日期",
      key: "birthDate",
    },
    {
      title: "死亡日期",
      key: "deathDate",
    },
    {
      title: "操作",
      key: "operator",
      render(row) {
        const btn = btnList.map(e => {
          return h(
            NButton,
            {
              type: e.type as Type,
              size: "small",
              onClick: () => e.click(row),
              class: 'mb-1.25 mr-1.25'
            },
            {
              default: () => e.name,
            }
          );
        })
        return btn
      },
    },
  ];
}

function rowKey(row: RowData) {
  return row._id;
}
function handleCheck(rowKeys: DataTableRowKey[]) {
  console.log("handleCheck", rowKeys);
}

const tableData = ref<Array<Object>>([]);
const searchLoading = ref(false);

async function getList() {
  searchLoading.value = true;
  const res: Array<Object> = await $fetch("/api/userList", {
    method: "post",
    body: formData.value,
  });
  if (res) {
    tableData.value = res;
  }

  setTimeout(() => {
    searchLoading.value = false;
  }, 1000);
}
getList();

function handleReset() {
  formData.value = {
    name: "",
    // birthDate: null,
    // deathDate: null,
  };
  getList();
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const delInfo = ref<any>({})

function showDele(row: any) {
  showModal.value = true
  delInfo.value = row
}
async function handleDelete() {
  await $fetch("/api/userList/del", {
    method: "post",
    body: { name: delInfo.value?.name },
  });
  message.success('操作成功')
  getList()
}

const previewImageUrlRef = ref('')
function handlePreview(file: UploadFileInfo) {
  const { url } = file
  previewImageUrlRef.value = url as string
}
</script>
