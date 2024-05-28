<template>
  <div class="m-20px">
    <div class="card">
      <n-form ref="formRef" :model="formData" label-placement="left">
        <n-flex>
          <n-form-item path="name" label="姓名">
            <n-input
              v-model:value="formData.name"
              @keydown.enter.prevent
              placeholder="请输入姓名"
            />
          </n-form-item>
          <n-form-item path="password" label="时间">
            <n-date-picker
              v-model:value="formData.time"
              type="datetimerange"
              clearable
              value-format="yyyy.MM.dd HH:mm:ss"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </n-form-item>
          <n-button
            :disabled="formData.name === null"
            :loading="searchLoading"
            round
            type="primary"
            @click="getList"
          >
            搜索
          </n-button>
        </n-flex>
      </n-form>
    </div>
    <div class="card">
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
</template>

<script setup lang="ts">
import type { DataTableColumns, DataTableRowKey } from "naive-ui";
import type { RowData } from "naive-ui/es/data-table/src/interface";

const formData = ref({
  name: "",
  time: null,
});

const formRef = ref();
// const message = useMessage();
const columns = computed(() => createColumns());

const pagination = ref({
  pageSize: 5,
});

function createColumns(): DataTableColumns<RowData> {
  return [
    {
      type: "selection",
      disabled: (row: RowData) => row.name == "66",
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
    // body: { test: 123 },
  });
  tableData.value = res?.data;
  console.log("getList", res);

  setTimeout(() => {
    searchLoading.value = false;
  }, 1000);
}
getList();
</script>
