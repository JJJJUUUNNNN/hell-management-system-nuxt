<template>
  <div class="m-5">
    <div class="card">
      <n-form>
        <n-flex>
          <n-form-item path="name" label="设备名称" label-placement="left">
            <n-input v-model:value="formData.name" placeholder="请输入设备名称" clearable />
          </n-form-item>
          <n-button :disabled="formData.name === null" :loading="searchLoading" round type="primary"
            @click="getList">搜索</n-button>
          <n-button :disabled="formData.name === null" round @click="handleReset">重置</n-button>
        </n-flex>
      </n-form>
    </div>
    <div class="card">
      <n-flex class="mb-5">
        <n-button>新增设备</n-button>
      </n-flex>
      <n-data-table :loading="searchLoading" :columns="columns" :data="tableData" :pagination="pagination"
        :row-key="rowKey" @update:checked-row-keys="handleCheck" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NImage, type DataTableColumns, type DataTableRowKey } from 'naive-ui';
import type { Type } from 'naive-ui/es/button/src/interface';
import type { RowData } from 'naive-ui/es/data-table/src/interface';

const formData = ref({
  name: ''
})

const columns = computed(() => createColumns())

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

function rowKey(row: RowData) {
  return row._id;
}

const pagination = ref({
  pageSize: 5,
});

function handleCheck(rowKeys: DataTableRowKey[]) {
  console.log("handleCheck", rowKeys);
}

const searchLoading = ref(false)
const tableData = ref<Array<object>>([]);

async function getList() {
  searchLoading.value = true
  const res: Array<object> = await $fetch("/api/eighteenHell/deviceManage", {
    method: "post",
    body: formData.value
  })

  if (res) {
    tableData.value = res
  }
  searchLoading.value = false
}
getList()

function handleReset() {
  formData.value = {
    name: "",
  };
  getList();
}

function createColumns(): DataTableColumns<RowData> {
  return [
    {
      type: "selection",
    },
    {
      title: '图片',
      key: 'image',
      render(row) {
        return h(
          NImage,
          {
            width: 50,
            src: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          },
          {
            default: () => row.image
          })
      }
    },
    {
      title: "设备名称",
      key: "name"
    },
    {
      title: "开始使用时间",
      key: "created_at"
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
      }
    }
  ]
}

function showDele(row: any) {

}

function updateUser(row: any, type: string) {

}

</script>

<style scoped></style>