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
        <DataTable :loading="loading" :value="assetsList" paginator showGridlines :rows="10" dataKey="id">
          <Column field="index" header="編號" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.index }}
            </template>
          </Column>
          <Column field="id" header="資產編號" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.id }}
            </template>
          </Column>
          <Column field="name" header="資產名稱" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.name }}
            </template>
          </Column>
          <Column field="type" header="廠牌型號" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.type }}
            </template>
          </Column>
          <Column field="code" header="產品序號" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.product_code }}
            </template>
          </Column>
          <Column field="acquire_date" header="取得日期" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.acquire_date }}
            </template>
          </Column>
          <Column field="custodian_operation" header="操作" style="min-width: 12rem">
            <template #body="{ data }">
              <Button @click="viewInfo(data.id)" label="查看/編輯" class="p-button-rounded p-button-success mr-2 mb-2" />
              <Button @click="deleteData(data.id)" label="刪除" class="p-button-rounded p-button-danger mr-2 mb-2" />
              <!-- {{ data.id }} -->
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAssetsStore } from "@/store/useAssetsStore"
const { assetsList } = storeToRefs(useAssetsStore())
const { setAssetsList, setCurrentAssetId } = useAssetsStore()

const loading = ref(true)
onMounted(() => {
  //模擬取得資料
  setTimeout(() => {
    setAssetsList([
      //假資料
      {
        id: '001',
        name: '蘋果電腦',
        type:"AS2001",
        product_code:'53677SBGGTTH-SDASDA',
        acquire_date:'112.09.10',
        acquisition_cost:35000
      },
      {
        id: '002',
        name: '印表機-愛普森',
        type:"GGL",
        product_code:'7846534654BGGTTH-SDASDA',
        acquire_date:'111.11.08',
        acquisition_cost:4580
      },
    ])
    loading.value = false
  }, 500)
})

function viewInfo(id: string) {
  setCurrentAssetId(id)
  navigateTo(`asset_equipment/${id}`)
}
function deleteData(id: string) {
  console.log(id)
}


</script>
<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>