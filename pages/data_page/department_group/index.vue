<script setup lang="ts">
import { object, string } from 'yup';
import { useDepartmentStore } from "@/store/useDepartmentStore"
import useDepartmentAPI from "~/composables/api/useDepartmentAPI"
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { Department } from '~/types/department';

const { departmentList } = storeToRefs(useDepartmentStore())
const { setDepartmentList, setCurrentDepartment } = useDepartmentStore()
const { getDepartments, deleteDepartment, createDepartment } = useDepartmentAPI()
const loading = ref(true)
const toast = useToast()
const confirm = useConfirm();

let isAddDepartmentDialogVisble = ref(false)
let newDepartmentParent = ref(null)

//validate 
const { defineField, values, errors, meta, resetForm } = useForm({
  validationSchema: object({
    name: string().required(),
    code: string().required(),
  }),
})
const [name, nameAttrs] = defineField('name')
const [code, codeAttrs] = defineField('code')

onMounted(() => {
  loadDepartments()
})

async function loadDepartments() {
  const departmentsData = await getDepartments()
  departmentsData.forEach(department => {
    loadDepartmentNodeRecursive(department)
  })
  setDepartmentList(departmentsData)
  loading.value = false
}
function loadDepartmentNodeRecursive(item: Department) { //遞迴的裝載child資料
  loadDepartmentNodeData(item);
  if (!item.children) return
  item.children.forEach(department => loadDepartmentNodeRecursive(department))
}

function loadDepartmentNodeData(item: Department) {
  item.key = item.code;
  item.data = {
    id: item.id,
    name: item.name,
    code: item.code,
    depth: item.depth,
  };
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

async function submitDepartment() {
  console.log(newDepartmentParent.value)
  if (!meta.value.valid) return console.log(errors.value)
  await createDepartment({
    name: values.name,
    code: values.code,
    parent_id: newDepartmentParent.value?.id
  })
  loadDepartments()
  isAddDepartmentDialogVisble.value = false
    resetForm({
      values: {
        name: '',
        code: ''
      }
    })
    newDepartmentParent.value = null
    toast.add({
      severity: 'success',
      summary: 'Success',
      detail: '新增成功',
      life: 3000,
    })
}
async function deleteData(id: string) {
  await deleteDepartment({ id })
  loadDepartments()
  toast.add({ severity: "info", summary: "刪除成功", detail: `您已刪除代號 : ${id}的相關資料`, life: 3000 })
}
function confirmDeleteData(id: string) {
  confirm.require({
    message: `確定要刪除代號為${id}的資料?`,
    header: '重要提醒',
    accept: () => deleteData(id),
    reject: () => toast.add({ severity: "error", summary: "取消刪除", detail: `您已取消刪除代號為${id}操作`, life: 3000 })
  })
}
function viewData(department:Department){
  setCurrentDepartment(department)
  navigateTo(`department_group/${department.id}`)
}

const filters = ref({})

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
        <TreeTable 
          :value="departmentList" 
          :loading="loading" 
          :filters="filters"
        >
          <template #header>
            <div class="text-right">
              <IconField iconPosition="left">
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global']" placeholder="Global Search" />
              </IconField>
            </div>
          </template>
          <Column field="code" header="部門代號">
            <template #filter>
              <InputText v-model="filters['code']" class="p-column-filter" />
            </template>
          </Column>
          <Column field="name" header="部門名稱" expander="true">
            <template #filter>
              <InputText v-model="filters['name']" class="p-column-filter" />
            </template>
          </Column>
          <Column header="操作">
            <template #body="slotProps">
              <div class="flex flex-wrap gap-2">
                <Button @click="viewData(slotProps.node.data)" severity="success" icon="pi pi-pencil" type="button" rounded/>
                <Button @click="addDepartment(slotProps.node.data)" type="button" icon="pi pi-plus" rounded
                  v-if="slotProps.node.data.depth < 2" />
                <!-- <Button @click="confirmDeleteData(slotProps.node.data.id)" icon="pi pi-minus" severity="danger" rounded></Button> -->
                <!-- <Button @click="editData(slotProps.node.data.id)" type="button" icon="pi pi-pencil" rounded severity="success" /> -->
              </div>
            </template>
          </Column>
        </TreeTable>
      </div>
    </div>
  </div>
  <Dialog v-bind:visible="isAddDepartmentDialogVisble" modal>
    <span class="p-text-secondary block mb-5" v-if="!newDepartmentParent">新增部門</span>
    <span class="p-text-secondary block mb-5" v-else>新增 {{ newDepartmentParent.name }} ({{
      newDepartmentParent.code }}) 的子部門</span>
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
}
</style>