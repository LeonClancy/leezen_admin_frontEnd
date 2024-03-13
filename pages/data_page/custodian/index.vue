<script setup lang="ts">
import { useCustodianStore } from "@/store/useCustodianStore"
import useCustodianAPI from "@/composables/api/useCustodianAPI"
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const { custodianList } = storeToRefs(useCustodianStore())
const { setCustodianList, setCurrentCustodianId } = useCustodianStore()
const { deleteCustodian, getCustodians } = useCustodianAPI()

const loading = ref(true)
onMounted(() => {
  fetchCustodians();
})
async function fetchCustodians() {
  const custodians = await getCustodians();
  loading.value = false;
  setCustodianList(custodians);
}

function confirmDeleteData(id: number) {
  confirm.require({
    message: `確定要刪除代號為${id}的資料?`,
    header: '重要提醒',
    accept: () => deleteData(id),
    reject: () => toast.add({ severity: "error", summary: "取消刪除", detail: `您已取消刪除代號為${id}操作`, life: 3000 })
  })
}
function viewInfo(id: string) {
  setCurrentCustodianId(id)
  navigateTo(`custodian/${id}`)
}
async function deleteData(id:number) {
  const deleteCustodianData = await deleteCustodian({ id })
  const newList = custodianList.value.filter(custodiant => custodiant.id !== deleteCustodianData.id)
  setCustodianList(newList)
  toast.add({ severity: "info", summary: "刪除成功", detail: `您已刪除代號 : ${id}的相關資料`, life: 3000 })
}
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>保管人基本資料</h5>
        <div class="col-12 flex justify-content-end">
          <NuxtLink to="custodian/create">
            <Button label="新增" class="p-button-outlined p-button-secondary mr-2 mb-2" />
          </NuxtLink>
          <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
        </div>
        <DataTable :loading="loading" :value="custodianList" paginator showGridlines :rows="10" dataKey="id">
          <Column field="index" header="保管人編號" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.code }}
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
              <Button @click="confirmDeleteData(data.id)" label="刪除" class="p-button-rounded p-button-danger mr-2 mb-2"></Button>
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