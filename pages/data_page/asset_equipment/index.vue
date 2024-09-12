<script setup lang="ts">
import { useAssetsStore } from "@/store/useAssetsStore"
import useAssetAPI from "~/composables/api/useAssetAPI";
import AssetService from "~/service/AssetService";
import moment from 'moment';
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import DepartmentService from "~/service/DepartmentService";

const { assetsList } = storeToRefs(useAssetsStore())
const { setAssetsList, setCurrentAssetId } = useAssetsStore()
const { getAssets } = useAssetAPI()
const service = new AssetService()
const departments = ref([]);
const departmentService = new DepartmentService()

const loading = ref(true)
onMounted(() => {
  loadAssets()
  loadDepartments()
})

const searchParam = ref({
  name: '',
  department_id: ''
})

async function loadAssets() {
  const assetsList = await getAssets(searchParam.value)
  setAssetsList(assetsList)
  loading.value = false
}

function viewInfo(id: string) {
  setCurrentAssetId(id)
  navigateTo(`asset_equipment/edit/${id}`)
}
function deleteData(id: string) {
  console.log(id)
}

function exportExcel() {
  service.exportAssets().then((res) => {
    return res.blob()
  }).then((blob) => {
    const url = window.URL.createObjectURL(new Blob([blob]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', '資產設備基本資料.xlsx')
    document.body.appendChild(link)
    link.click()
  })
}

function exportInventoryList() {
  service.exportInventoryList().then((res) => {
    return res.blob()
  }).then((blob) => {
    const url = window.URL.createObjectURL(new Blob([blob]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', '資產設備盤點清單.xlsx')
    document.body.appendChild(link)
    link.click()
  })
}

function loadDepartments() {
  departmentService.getDepartmentsOptions()
    .then((data) => {
      departments.value = data
    })
}

</script>
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h4>資產設備基本資料</h4>
        <h5>搜尋</h5>
        <div class="formgrid grid">
          <div class="field col-4">
            <label for="name">資產名稱</label>
            <InputText id="name" type="text" v-model="searchParam.name" />
          </div>
          <div class="field col-4">
            <label for="department">部門</label>
            <Dropdown 
              id="department"
              v-model="searchParam.department_id" 
              :options="departments"
              optionValue="id"
              optionLabel="name"
              showClear />
          </div>
        </div>
        <div class="col-12 flex justify-content-end">
          <Button label="搜尋" icon="pi pi-search" class="p-button-outlined p-button-secondary mr-2 mb-2" @click="loadAssets()" />
        </div>
        <div class="col-12 flex justify-content-end">
          <NuxtLink to="asset_equipment/create">
            <Button label="新增" icon="pi pi-plus" class="p-button-outlined p-button-secondary mr-2 mb-2"/>
          </NuxtLink>
          <Button label="財務列表" icon="pi pi-file-export" class="p-button-outlined p-button-secondary mr-2 mb-2" @click="exportExcel()" />
          <Button label="盤點清單" icon="pi pi-file-export" class="p-button-outlined p-button-secondary mr-2 mb-2" @click="exportInventoryList()" />
        </div>
        <DataTable :loading="loading" :value="assetsList" paginator showGridlines :rows="10" dataKey="id">
          <!-- <Column field="index" header="編號" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.id }}
            </template>
          </Column> -->
          <Column field="deparmentName" header="部門名稱" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.department_name }}
            </template>
          </Column>
          <Column field="id" header="資產編號" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.asset_number }}
            </template>
          </Column>
          <Column field="name" header="資產名稱" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.name }}
            </template>
          </Column>
          <Column field="type" header="廠牌型號" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.brand_model }}
            </template>
          </Column>
          <Column field="code" header="產品序號" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.product_serial_number }}
            </template>
          </Column>
          <Column field="uniform_number" header="統一編號" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.uniform_number }}
            </template>
          </Column>
          <Column field="acquisition_date" header="取得日期" style="min-width: 12rem">
            <template #body="{ data }">
              {{ moment(data.acquisition_date).format('YYYY/MM/DD') }}
            </template>
          </Column>
          <Column field="custodian_operation" header="操作" style="min-width: 12rem">
            <template #body="{ data }">
              <Button @click="viewInfo(data.id)" label="查看/編輯" class="p-button-rounded p-button-success mr-2 mb-2" />
              <!-- <Button @click="deleteData(data.id)" label="刪除" class="p-button-rounded p-button-danger mr-2 mb-2" /> -->
              <!-- {{ data.id }} -->
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>