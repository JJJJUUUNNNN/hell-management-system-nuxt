<template>
  <div class="m-5">
    <div class="card">
      <n-form :model="formData" label-placement="left">
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

  <update v-model:visible="showDrawer" :updateType="updateType" :data="userData" @fetchList="getList" />
</template>

<script setup lang="ts">
import {
  NButton,
  NImage,
  useMessage,
  type DataTableColumns,
  type DataTableRowKey,
} from "naive-ui";
import type { Type } from "naive-ui/es/button/src/interface";
import type { RowData } from "naive-ui/es/data-table/src/interface";
import update from "./components/update.vue"

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


const message = useMessage();
const columns = computed(() => createColumns());

const pagination = ref({
  pageSize: 5,
});

const showModal = ref(false);
const showDrawer = ref(false);

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
const userData = ref({})

function updateUser(row: any, type: string) {
  showDrawer.value = true;
  updateType.value = type
  userData.value = row
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
  const res: Array<Object> = await $fetch("/api/lifeDeathBook/userManage", {
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
  await $fetch("/api/lifeDeathBook/userManage/del", {
    method: "post",
    body: { name: delInfo.value?.name },
  });
  message.success('操作成功')
  getList()
}



</script>
