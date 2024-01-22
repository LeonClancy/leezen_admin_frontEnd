<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>保管人詳細資訊</h5>
        {{ custodian }}
        <div class="col12 flex justify-content-end">
          <Button label="新增" class="p-button-outlined p-button-secondary mr-2 mb-2" />
          <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustodianStore } from "@/store/useCustodianStore"
const route = useRoute()
const { custodiantId } = route.params
const { custodian } = storeToRefs(useCustodianStore())

</script>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>