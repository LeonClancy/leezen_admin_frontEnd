<!-- eslint-disable vue/component-tags-order -->
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>編輯會員</h5>
        <div class="col-12 flex justify-content-end">
          <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="name" class="font-semibold w-6rem">姓名</label>
          <div>
            <InputText id="name" class="flex-auto" :class="[errors.name ? 'p-invalid' : '']" autocomplete="off"
              v-model="name" v-bind="nameAttrs" />
            <p>{{ errors.name ? '請填寫姓名' : '' }}</p>
          </div>
        </div>
         <div class="flex align-items-center gap-3 mb-5">
          <label for="email" class="font-semibold w-6rem">信箱</label>
          <div>
            <InputText id="Email" class="flex-auto" :class="[errors.email ? 'p-invalid' : '']" autocomplete="off"
              v-model="email" v-bind="emailAttrs" />
            <p>{{ errors.name ? '請填寫信箱' : '' }}</p>
          </div>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="custodian_name" class="font-semibold w-6rem">連結保管人</label>
          <div>
            <Dropdown id="custodian_id" :class="[errors.custodian_id ? 'p-invalid' : '']" class="w-full" option-label="name" option-value="id" :options="custodians"
              v-model="custodian_id" v-bind="custodianIdAttrs" />
            <p>{{ errors.custodian_id ? '請選擇保管人' : '' }}</p>
          </div>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
          <label for="role" class="font-semibold w-6rem">角色</label>
          <div>
            <Dropdown id="role" class="flex-auto" :class="[errors.role ? 'p-invalid' : '']" option-label="name" option-value="id" :options="roles"
              v-model="role_id" v-bind="roleAttrs" />
            <p>{{ errors.role ? '請填寫角色' : '' }}</p>
          </div>
        </div>
        <div class="col-12 flex justify-content-end">
          <Button :disabled="!meta.valid" label="修改" class="mr-2 mb-2" @click="fetchUpdateCustodianData"></Button>
          <NuxtLink to="/manage/member">
            <Button label="取消" class="p-button-outlined p-button-secondary mr-2 mb-2" />
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { object, string, number } from 'yup';
import { useMembersStore } from "@/store/useMembersStore"
import useMemberAPI from '~/composables/api/useMemberAPI';
import { useToast } from "primevue/usetoast";
import CustodianService from '~/service/CustodianService';
import RoleService from '~/service/RoleService';

const toast = useToast();
const { updateMember } = useMemberAPI()
const { member } = storeToRefs(useMembersStore())
const custodianService = new CustodianService()
const roleService = new RoleService()

let custodians = ref([])
let roles = ref([])

onMounted(async () => {
  custodianService.getCustodians().then((res) => {
    custodians.value = res.custodians
  })
  roleService.getRoles().then((res) => {
    roles.value = res.roles
  })
})

//validate 
const { defineField, values, errors, meta, resetForm, setValues } = useForm({
  validationSchema: object({
    name: string().required(),
    email: string().required(),
    custodian_id: number().required(),
    role_id: number().required(),
  }),
})
const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [custodian_id, custodianIdAttrs] = defineField('custodian_id')
const [role_id, roleAttrs] = defineField('role_id')

initInputData()
async function initInputData() {
  setValues({
    name: member.value.name,
    email: member.value.email,
    custodian_id: member.value.custodian_id,
    role_id: member.value.role_id,
  })
}
async function fetchUpdateCustodianData() {
  if(!meta.value.valid) return
  await updateMember({
    id: member.value.id,
    name: member.value.name,
    email: member.value.email,
    custodian_id: custodian_id.value,
    role_id: role_id.value,
  })
  toast.add({ severity: "success", summary: "更新成功", detail: `您已更新代號 : ${member.value.id}的相關資料`, life: 3000 })
  navigateTo('/manage/member')
}
</script>