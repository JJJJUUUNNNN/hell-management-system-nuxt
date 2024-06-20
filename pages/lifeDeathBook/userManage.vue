<template>
  <div class="m-5">
    <div class="card">
      <n-form ref="formRef" :model="formData" label-placement="left">
        <n-flex>
          <n-form-item path="name" label="姓名">
            <n-input
              v-model:value="formData.name"
              @keydown.enter.prevent
              placeholder="请输入姓名"
              clearable
            />
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
          <n-button
            :disabled="formData.name === null"
            :loading="searchLoading"
            round
            type="primary"
            @click="getList"
          >
            搜索
          </n-button>
          <n-button
            :disabled="formData.name === null"
            round
            @click="handleReset"
          >
            重置
          </n-button>
        </n-flex>
      </n-form>
    </div>
    <div class="card">
      <n-flex class="mb-5">
        <n-button
          :disabled="formData.name === null"
          :loading="searchLoading"
          round
          type="warning"
          @click="showModal = true"
        >
          创建用户
        </n-button>
      </n-flex>
      <n-data-table
        :loading="searchLoading"
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
        :row-key="rowKey"
        @update:checked-row-keys="handleCheck"
      />
    </div>
  </div>

  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="确认"
    positive-text="确认"
    negative-text="算了"
    @positive-click="handleAdd"
    @negative-click="showModal = false"
  >
  <p>6666</p>
  </n-modal>
</template>

<script setup lang="ts">
import {
  NButton,
  NImage,
  useMessage,
  type DataTableColumns,
  type DataTableRowKey,
} from "naive-ui";
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
        return h(
          NButton,
          {
            type: "error",
            size: "small",
            onClick: () => handleDelete(row),
          },
          {
            default: () => "移除",
          }
        );
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

const tableData = ref([]);
const searchLoading = ref(false);

async function getList() {
  searchLoading.value = true;
  const res = await $fetch("/api/userList", {
    method: "post",
    body: formData.value,
  });
  tableData.value = res.data;
  console.log("getList", res);

  setTimeout(() => {
    searchLoading.value = false;
  }, 1000);
}
getList();

function handleReset() {
  formData.value = {
    name: "",
    birthDate: null,
    deathDate: null,
  };
  getList();
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
function handleAdd() {
  return new Promise(async (resolve) => {
    await sleep(1000);
    resolve(message.success("add"));
  });
}
function handleDelete(row: any) {
  console.log("移除", row);
}
</script>
