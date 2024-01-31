<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>部門群組資訊</h5>
        <div class="col-12 flex justify-content-end">
          <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
        </div>
        <div class="col-12">

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useDepartmentStore } from "@/store/useDepartmentStore"
const route = useRoute()
const { departmentId } = route.params
// const { department } = storeToRefs(useDepartmentStore())

</script>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>