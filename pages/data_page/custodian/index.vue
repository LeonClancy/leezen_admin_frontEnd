<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>保管人基本資料</h5>
        <div class="col-12 flex justify-content-end">
          <NuxtLink to="custodian/create">
            <Button label="新增" class="p-button-outlined p-button-secondary mr-2 mb-2"/>
          </NuxtLink>
          <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
        </div>
        <DataTable :loading="loading" :value="custodianList" paginator showGridlines :rows="10" dataKey="id">
          <Column field="index" header="編號" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.index }}
            </template>
          </Column>
          <Column field="custodian_id" header="保管人代號" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.id }}
            </template>
          </Column>
          <Column field="custodian_name" header="保管人姓名" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.name }}
            </template>
          </Column>
          <Column field="custodian_phone" header="連絡電話" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.phone_number }}
            </template>
          </Column>
          <Column field="custodian_mobile" header="行動電話" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.mobile_number }}
            </template>
          </Column>
          <Column field="custodian_email" header="電子郵件" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.email }}
            </template>
          </Column>
          <Column field="custodian_operation" header="操作" style="min-width: 12rem">
            <template #body="{ data }">
              <Button @click="viewInfo(data.id)" label="詳細" class="p-button-rounded p-button-info mr-2 mb-2" />
              <Button @click="edit(data.id)" label="修改" class="p-button-rounded p-button-success mr-2 mb-2" />
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
import { useCustodianStore } from "@/store/useCustodianStore"
const { custodianList } = storeToRefs(useCustodianStore())
const { setCustodianList, setCurrentCustodianId } = useCustodianStore()

const loading = ref(true)
onMounted(() => {
  //模擬取得資料
  setTimeout(() => {
    setCustodianList([
      //假資料
      {
        id: '001',
        name: 'Jamy',
        phone_number: '04-29895578',
        mobile_number: '0956789456',
        email: 'gg@gmail.com'
      },
      {
        id: '002',
        name: '王世傑',
        phone_number: '04-29895578',
        mobile_number: '0956789456',
        email: 'jj@gmail.com'
      },
    ])
    loading.value = false
  }, 500)
})

function viewInfo(id: string) {
  setCurrentCustodianId(id)
  navigateTo(`custodian/${id}`)
}
function edit(id: string) {
  console.log(id)
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