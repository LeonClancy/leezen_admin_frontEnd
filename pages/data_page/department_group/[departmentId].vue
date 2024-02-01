<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>部門群組資訊</h5>
        <div class="col-12 flex justify-content-end">
          <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
        </div>
        <div class="flex align-items-center gap-3 mb-3">
          <label for="username" class="font-semibold w-6rem">部門代號</label>
          <div>
            <InputText id="username" class="flex-auto" :class="[errors.code ? 'p-invalid' : '']" autocomplete="off"
              v-model="code" v-bind="codeAttrs" />
            <p>{{ errors.code ? '請填寫代號' : '' }}</p>
          </div>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="email" class="font-semibold w-6rem">部門名稱</label>
          <div>
            <InputText id="Email" class="flex-auto" :class="[errors.name ? 'p-invalid' : '']" autocomplete="off"
              v-model="name" v-bind="nameAttrs" />
            <p>{{ errors.name ? '請填寫名稱' : '' }}</p>
          </div>
        </div>
        <div class="col-12 flex justify-content-end">
          <Button label="修改" class="mr-2 mb-2" @click="fetchUpdateCustodianData"></Button>
          <NuxtLink to="/data_page/department_group">
            <Button label="取消" class="p-button-outlined p-button-secondary mr-2 mb-2" />
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, string } from 'yup';
import { useDepartmentStore } from "@/store/useDepartmentStore"
import useDepartmentAPI from '~/composables/api/useDepartmentAPI';
import { useToast } from "primevue/usetoast";
const toast = useToast();
const { updateDepartment } = useDepartmentAPI()
const { currentDepartment } = storeToRefs(useDepartmentStore())
//validate 
const { defineField, values, errors, meta, resetForm, setValues } = useForm({
  validationSchema: object({
    name: string().required(),
    code: string().required()
  }),
})
const [code, codeAttrs] = defineField('code')
const [name, nameAttrs] = defineField('name')
initDepartmentInputData()
async function initDepartmentInputData() {
  setValues({
    code: currentDepartment.value.code,
    name: currentDepartment.value.name,
  })
}
async function fetchUpdateCustodianData() {
  await updateDepartment({
    id:currentDepartment.value.id,
    code,
    name,
  })
  toast.add({ severity: "success", summary: "更新成功", detail: `您已更新代號 : ${currentDepartment.value.id}的相關資料`, life: 3000 })
  navigateTo('/data_page/department_group')
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