<script setup lang="ts">
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
let newDepartment = ref({
  name: '',
  code: '',
  parentDepartment: null,
})


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

function viewInfo(id: string) {
  console.log(id)
  setCurrentDepartmentId(id)
  navigateTo(`department_group/${id}`)
}
function editData(id: string) {
  setCurrentDepartmentId(id)
  navigateTo(`department_group/${id}`)
}

function addDepartment(parentDepartment = null) {
  isAddDepartmentDialogVisble.value = true
  newDepartment.value.parentDepartment = parentDepartment
  console.log(newDepartment.value);

}

function deleteData(id: string) {
  console.log(id)
}

function cancelNewDepartment() {
  isAddDepartmentDialogVisble.value = false
  newDepartment.value = {
    name: '',
    code: '',
    parentDepartment: null,
  }
}

function submitDepartment() {
  console.log(newDepartment.value)
  service.createDepartment({
    name: newDepartment.value.name,
    code: newDepartment.value.code,
    parent_id: newDepartment.value.parentDepartment?.id,
  }).then((data) => {
    console.log(data)
    loadDepartments()
    isAddDepartmentDialogVisble.value = false
    newDepartment.value = {
      name: '',
      code: '',
      parentDepartment: null,
    }
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
                        <Button @click="addDepartment(slotProps.node.data)" type="button" icon="pi pi-plus" rounded v-if="slotProps.node.data.depth < 2"/>
                        <!-- <Button @click="editData(slotProps.node.data.id)" type="button" icon="pi pi-pencil" rounded severity="success" /> -->
                    </div>
                </template>
            </Column>
        </TreeTable>
      </div>
    </div>
  </div>
  <Dialog v-bind:visible="isAddDepartmentDialogVisble" modal>
    <span class="p-text-secondary block mb-5" v-if="newDepartment.parentDepartment == null">新增部門</span>
    <span class="p-text-secondary block mb-5" v-else>新增 {{ newDepartment.parentDepartment.name }} ({{ newDepartment.parentDepartment.code }}) 的子部門</span>
    <div class="flex align-items-center gap-3 mb-3">
        <label for="username" class="font-semibold w-6rem">部門代號</label>
        <InputText id="username" class="flex-auto" autocomplete="off" v-model="newDepartment.code" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
        <label for="email" class="font-semibold w-6rem">部門名稱</label>
        <InputText id="Email" class="flex-auto" autocomplete="off" v-model="newDepartment.name" />
    </div>
    <div class="flex justify-content-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="cancelNewDepartment()"></Button>
        <Button type="button" label="Save" @click="submitDepartment()"></Button>
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