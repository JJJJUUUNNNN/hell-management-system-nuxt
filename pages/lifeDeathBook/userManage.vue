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
// import { DataTableColumns, DataTableRowKey } from "naive-ui";
// import { RowData } from "naive-ui/es/data-table/src/interface";

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

function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault();
}

// function createColumns(): DataTableColumns<RowData> {
function createColumns() {
  return [
    {
      type: "selection",
      // disabled: (row: RowData) => row.name == "66",
      disabled: (row: any) => row.name == "66",
    },
    {
      title: "姓名",
      key: "name",
    },
    {
      title: "时间",
      key: "time",
    },
  ];
}

// function rowKey(row: RowData) {
function rowKey(row: any) {
  return row.id;
}
// function handleCheck(rowKeys: DataTableRowKey[]) {
function handleCheck(rowKeys: any) {
  console.log("handleCheck", rowKeys);
}

const tableData: any = ref([]);

function getList() {
  $fetch("/api/userList").then((res) => {
    if (res?.code == 0) {
      tableData.value = res?.data;
    }
    console.log(res)
  });
}
getList();
</script>
