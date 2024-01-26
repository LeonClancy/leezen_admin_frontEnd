<script setup lang="ts">
import { useCustodianStore } from "@/store/useCustodianStore"
import { CustodianService } from "~/service/CustodianService";
const { custodianList } = storeToRefs(useCustodianStore())
const { setCustodianList, setCurrentCustodianId } = useCustodianStore()

const service = new CustodianService()

const loading = ref(true)
onMounted(() => {
  service.getCustodians().then((data) => {
    loading.value = false
    console.log(data);
    
    custodianList.value = data.custodians
  })
})

function viewInfo(id: string) {
  setCurrentCustodianId(id)
  navigateTo(`custodian/${id}`)
}
function deleteData(id: string) {
  console.log(id)
}

</script>

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
              {{ data.code }}
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
              {{ data.contact_number }}
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

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>