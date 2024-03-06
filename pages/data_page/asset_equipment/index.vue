<script setup lang="ts">
import { useAssetsStore } from "@/store/useAssetsStore"
import AssetService from "~/service/AssetService";

const { assetsList } = storeToRefs(useAssetsStore())
const { setAssetsList, setCurrentAssetId } = useAssetsStore()

let assets = ref([])

const service = new AssetService()

const loading = ref(true)
onMounted(() => {
  loadAssets()
})

function loadAssets() {
  service.getAssets().then((data) => {
    assets.value = data.assets
    loading.value = false
  })
}

function viewInfo(id: string) {
  setCurrentAssetId(id)
  navigateTo(`asset_equipment/edit/${id}`)
}
function deleteData(id: string) {
  console.log(id)
}


</script>
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>資產設備基本資料</h5>
        <div class="col-12 flex justify-content-end">
          <NuxtLink to="asset_equipment/create">
            <Button label="新增" class="p-button-outlined p-button-secondary mr-2 mb-2"/>
          </NuxtLink>
          <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
        </div>
        <DataTable :loading="loading" :value="assets" paginator showGridlines :rows="10" dataKey="id">
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
          <Column field="acquire_date" header="取得日期" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.acquisition_date }}
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