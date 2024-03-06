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
          <label for="custodian_name" class="font-semibold w-6rem">保管人姓名</label>
          <div>
            <InputText id="custodian_name" class="flex-auto" :class="[errors.custodian_name ? 'p-invalid' : '']" autocomplete="off"
              v-model="custodian_name" v-bind="custodian_nameAttrs" />
            <p>{{ errors.custodian_name ? '請填寫保管人姓名' : '' }}</p>
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
import { object, string } from 'yup';
import { useMembersStore } from "@/store/useMembersStore"
import useMemberAPI from '~/composables/api/useMemberAPI';
import { useToast } from "primevue/usetoast";
const toast = useToast();
const { updateMember } = useMemberAPI()
const { member } = storeToRefs(useMembersStore())
//validate 
const { defineField, values, errors, meta, resetForm, setValues } = useForm({
  validationSchema: object({
    name: string().required(),
    email: string().required(),
    custodian_name: string().required()
  }),
})
const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [custodian_name, custodian_nameAttrs] = defineField('custodian_name')
initInputData()
async function initInputData() {
  setValues({
    name: member.value.name,
    email: member.value.email,
    custodian_name: member.value.custodian_name
  })
}
async function fetchUpdateCustodianData() {
  if(!meta.value.valid) return
  await updateMember({
    id:member.value.id,
    name: member.value.name,
    email: member.value.email,
    custodian_name: member.value.custodian_name
  })
  toast.add({ severity: "success", summary: "更新成功", detail: `您已更新代號 : ${member.value.id}的相關資料`, life: 3000 })
  navigateTo('/manage/member')
}
</script>