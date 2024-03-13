<script setup lang="ts">
import { object, string, date } from 'yup';
import { DepartmentsOption } from '~/types/department';
import useDepartmentAPI from '~/composables/api/useDepartmentAPI';
import useCustodianAPI from '~/composables/api/useCustodianAPI';

const { createCustodian } = useCustodianAPI()
const { getDepartmentsOptions } = useDepartmentAPI()
let departments = ref<DepartmentsOption[]>([]);

//validate 
const { defineField, errors, meta, values } = useForm({
  validationSchema: object({
    name: string().required(),
    code: string().required(),
    email:string().required().email(),
    id_number:string().required(),
    birthday:date().required(),
    contact_number:string().required(),
    mobile_number:string().required(),
    address:string().required(),
    department_id:string().required(),
    remarks:string(),
  }),
})
const [code, codeAttrs] = defineField('code')
const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [id_number, id_numberAttrs] = defineField('id_number')
const [birthday, birthdayAttrs] = defineField('birthday')
const [contact_number, contact_numberAttrs] = defineField('contact_number')
const [mobile_number, mobile_numberAttrs] = defineField('mobile_number')
const [address, addressAttrs] = defineField('address')
const [department_id, departmentAttrs] = defineField('department_id')
const [remarks, remarksAttrs] = defineField('remarks')

await initDepartmentOptions()

async function submitCustodian() {
    if(!meta.value.valid) return console.log(errors.value)
    const custodian =  await createCustodian(values)
    if(custodian) navigateTo('/data_page/custodian');
}
async function initDepartmentOptions(){
  const options = await getDepartmentsOptions()
  departments.value = options
}

</script>

<template>
    <div class="gride">
        <div class="col-12">
            <div class="card">
                <h5>新增保管人</h5>
                <div class="col-12">
                    <div class="field col">
                        <label class="mr-1 block" for="custodian_id">保管人代號</label>
                        <div>
                            <InputText id="custodian_id" :class="[errors.code ? 'p-invalid' : '']" type="text" v-model="code" v-bind="codeAttrs"/>
                            <p>{{ errors.code ? '請填寫代號' : '' }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-4">
                        <label class="mr-1 block" for="custodian_name">姓名</label>
                        <div>
                            <InputText id="custodian_name" :class="[errors.name ? 'p-invalid' : '']" type="text" v-model="name" v-bind="nameAttrs"/>
                            <p>{{ errors.name ? '請填寫名稱' : '' }}</p>
                        </div>
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="custodian__unit_number">身分證字號</label>
                        <div>
                            <InputText id="custodian__unit_number" :class="[errors.id_number ? 'p-invalid' : '']" type="text" v-model="id_number" v-bind="id_numberAttrs"/>
                            <p>{{ errors.id_number? '請填寫身分證字號' : '' }}</p>
                        </div>
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="custodian__birth_date">生日</label>
                        <div>
                            <Calendar id="custodian__birth_date" :class="[errors.birthday ? 'p-invalid' : '']" type="text" v-model="birthday" v-bind="birthdayAttrs"/>
                            <p>{{ errors.birthday ? '請選擇日期' : '' }}</p>
                        </div>
                    </div>
                </div>
                 <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-4">
                        <label class="mr-1 block" for="custodian_phone">連絡電話</label>
                        <div>
                            <InputText id="custodian_phone" :class="[errors.contact_number ? 'p-invalid' : '']" type="text" v-model="contact_number" v-bind="contact_numberAttrs"/>
                            <p>{{ errors.contact_number ? '請填寫連絡電話' : '' }}</p>
                        </div>
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="custodian__mobile_number">行動電話</label>
                        <div>
                            <InputText id="custodian_mobile_number" :class="[errors.mobile_number ? 'p-invalid' : '']" type="text" v-model="mobile_number" v-bind="mobile_numberAttrs"/>
                            <p>{{ errors.mobile_number ? '請填寫行動電話' : '' }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col">
                        <label class="block" for="department">部門群組</label>
                        <div>
                            <Dropdown id="department" :class="[errors.department ? 'p-invalid' : '']" v-model="department_id" v-bind="departmentAttrs" :options="departments" optionLabel="name" optionValue="id"></Dropdown>
                            <p>{{ errors.department ? '請選擇所屬的部門群組' : '' }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col">
                        <label class="mr-1 block" for="custodian_email">電子郵件</label>
                        <div>
                            <InputText id="custodian_email" :class="[errors.email ? 'p-invalid' : '']" type="text" v-model="email" v-bind="emailAttrs"/>
                            <p>{{ errors.email ? '請填寫正確的信箱格式' : '' }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-12">
                        <label class="mr-1 block" for="custodian__address">通訊地址</label>
                        <div>
                            <InputText id="custodian_address" :class="[errors.address ? 'p-invalid' : '']" type="text" v-model="address" v-bind="addressAttrs"/>
                            <p>{{ errors.address ? '請填信箱' : '' }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-12">
                        <label class="mr-1 block" for="custodian_memo">備註說明</label>
                        <div>
                            <InputText id="custodian_memo" :class="[errors.remarks ? 'p-invalid' : '']" type="text" v-model="remarks" v-bind="remarksAttrs"/>
                            <p>{{ errors.remarks ? '請填備註' : '' }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 flex justify-content-end">
                    <Button label="確認" class="mr-2 mb-2" @click="submitCustodian" :disabled="!meta.valid"></Button>
                    <NuxtLink to="/data_page/custodian">
                        <Button label="取消" class="p-button-outlined p-button-secondary mr-2 mb-2" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
