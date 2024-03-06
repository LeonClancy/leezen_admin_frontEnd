<script setup lang="ts">
import { object, string } from 'yup';
import useMemberAPI from '~/composables/api/useMemberAPI';
import { MemberCreateRequest } from '~/types/member';

const { createMember } = useMemberAPI()

//validate 
const { defineField, errors, meta, values } = useForm({
    validationSchema: object({
        name: string().required(),
        email: string().required().email(),
        custodian_name: string().required(),
    }),
})
const [name, nameAttrs] = defineField('name')
const [email, emailAttrs] = defineField('email')
const [custodian_name, custodian_nameAttrs] = defineField('custodian_name')

async function submit() {
    if (!meta.value.valid) return console.log(errors.value)
    await createMember(values as MemberCreateRequest)
    navigateTo('/manage/member');
}
</script>

<template>
    <div class="gride">
        <div class="col-12">
            <div class="card">
                <h5>新增會員</h5>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="col-4">
                        <label class="mr-1 block" for="name">姓名</label>
                        <div>
                            <InputText id="name" :class="[errors.name ? 'p-invalid' : '']" type="text" v-model="name" v-bind="nameAttrs" />
                            <p>{{ errors.name ? '請填寫名稱' : '' }}</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <label class="mr-1 block" for="custodian_email">電子郵件</label>
                        <div>
                            <InputText id="custodian_email" :class="[errors.email ? 'p-invalid' : '']" type="text" v-model="email" v-bind="emailAttrs" />
                            <p>{{ errors.email ? '請填寫正確的信箱格式' : '' }}</p>
                        </div>
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="col-4">
                        <label class="mr-1 block" for="custodian_name">保管人名稱</label>
                        <InputText id="custodian_name" type="text" :class="[errors.custodian_name ? 'p-invalid' : '']" v-model="custodian_name" v-bind="custodian_nameAttrs"/>
                        <p>{{ errors.custodian_name ? '請填寫保管人名稱' : '' }}</p>
                    </div>
                </div>
                <div class="col-12 flex justify-content-end">
                    <Button label="確認" class="mr-2 mb-2" @click="submit" :disabled="!meta.valid"></Button>
                    <NuxtLink to="/manage/member">
                        <Button label="取消" class="p-button-outlined p-button-secondary mr-2 mb-2" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>