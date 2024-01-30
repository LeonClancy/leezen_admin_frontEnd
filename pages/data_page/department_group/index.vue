<script setup lang="ts">
import { object, string } from 'yup';
import { useDepartmentStore } from "@/store/useDepartmentStore"
import DepartmentService from "~/service/DepartmentService";
import { useToast } from "primevue/usetoast";

const { departmentList } = storeToRefs(useDepartmentStore())
const { setDepartmentList, setCurrentDepartmentId } = useDepartmentStore()
const loading = ref(true)
const toast = useToast()

const service = new DepartmentService()
let departments = ref([])

let isAddDepartmentDialogVisble = ref(false)
let newDepartmentParent = ref(null)

//validate 
const { defineField, values, errors, meta, resetForm, setFieldError } = useForm({
  validationSchema: object({
    name: string().required(),
    code: string().required()
  }),
})
const [name, nameAttrs] = defineField('name')
const [code, codeAttrs] = defineField('code')

onMounted(() => {
  loadDepartments()
})

function loadDepartments() {
  service.getDepartments().then((data) => {
    console.log(data)
    data.departments.map((item) => {
      item.key = item.code
      item.data = {
        id: item.id,
        name: item.name,
        code: item.code,
        depth: item.depth,
      }
      if (item.children) {
        item.children.map((child) => {
          child.key = child.code
          child.data = {
            id: child.id,
            name: child.name,
            code: child.code,
            depth: child.depth,
          }
          if (child.children) {
            child.children.map((grandChild) => {
              grandChild.key = grandChild.code
              grandChild.data = {
                id: grandChild.id,
                name: grandChild.name,
                code: grandChild.code,
                depth: grandChild.depth,
              }
            })
          }
        })
      }
    })
    console.log(data.departments);
    departments.value = data.departments
    loading.value = false
  })
}

function addDepartment(parentDepartment = null) {
  isAddDepartmentDialogVisble.value = true
  newDepartmentParent.value = parentDepartment
  console.log(newDepartmentParent.value);
}

function cancelNewDepartment() {
  isAddDepartmentDialogVisble.value = false
  newDepartmentParent.value = null
}

function submitDepartment() {
  console.log(newDepartmentParent.value)
  if(!meta.value.valid) return console.log(errors.value)
  service.createDepartment({
   ...values, 
    parent_id: newDepartmentParent.value.id,
  }).then((data) => {
    console.log(data)
    loadDepartments()
    isAddDepartmentDialogVisble.value = false
    resetForm({
      values:{
        name:'',
        code:''
      }
    })
    newDepartmentParent.value = null
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: '新增成功',
      life: 3000,
    })
  })
}

</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>部門群組</h5>
        <div class="col-12 flex justify-content-end">
          <Button label="新增" class="p-button-outlined p-button-secondary mr-2 mb-2" @click="addDepartment(null)" />
          <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
        </div>
        <TreeTable :value="departments" :loading="loading">
          <Column field="code" header="部門代號"></Column>
          <Column field="name" header="部門名稱" expander="true"></Column>
          <Column headerStyle="width: 10rem" header="操作">
            <template #body="slotProps">
              <div class="flex flex-wrap gap-2">
                <Button @click="addDepartment(slotProps.node.data)" type="button" icon="pi pi-plus" rounded
                  v-if="slotProps.node.data.depth < 2" />
                <!-- <Button @click="editData(slotProps.node.data.id)" type="button" icon="pi pi-pencil" rounded severity="success" /> -->
              </div>
            </template>
          </Column>
        </TreeTable>
      </div>
    </div>
  </div>
  <Dialog v-bind:visible="isAddDepartmentDialogVisble" modal>
    <span class="p-text-secondary block mb-5" v-if="newDepartmentParent.parentDepartment == null">新增部門</span>
    <span class="p-text-secondary block mb-5" v-else>新增 {{ newDepartmentParent.parentDepartment.name }} ({{
      newDepartmentParent.parentDepartment.code }}) 的子部門</span>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="username" class="font-semibold w-6rem">部門代號</label>
      <div>
        <InputText id="username" class="flex-auto" :class="[errors.code ? 'p-invalid' : '']" autocomplete="off" v-model="code"
          v-bind="codeAttrs" />
        <p>{{ errors.code ? '請填寫代號' : '' }}</p>
      </div>
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="email" class="font-semibold w-6rem">部門名稱</label>
      <div>
        <InputText id="Email" class="flex-auto" :class="[errors.name ? 'p-invalid' : '']" autocomplete="off" v-model="name"
          v-bind="nameAttrs" />
          <p>{{ errors.name ? '請填寫名稱':'' }}</p>
      </div>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="cancelNewDepartment()"></Button>
      <Button type="button" label="Save" @click="submitDepartment()" :disabled="!meta.valid"></Button>
    </div>
  </Dialog>
  <Toast></Toast>
</template>

<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}</style>