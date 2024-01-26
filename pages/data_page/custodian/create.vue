<script setup lang="ts">
import { Position } from "@/types/custodian"
import { ref } from "vue";
import { CustodianService } from "~/service/CustodianService";

const service = new CustodianService()

let custodian = ref({
    code: '',
    name: '',
    email: '',
    id_number: '',
    birthday: '',
    contact_number: '',
    mobile_number: '',
    address: '',
    remarks: '',
});

const positionItem = ref({name:'部長', code:0});
const positionItems = ref([
    { name: '部長', code: Position.部長 },
    { name: '科長', code: Position.科長 },
    { name: '課長', code: Position.課長 }
]);
const departmentGroupIdItem = ref({name:'011', code:'011'});
const departmentGroupIdItems = ref([
    { name:'011', code:'011' },
    { name: '012', code: '012' },
]);

function submitCustodian() {
    console.log(custodian.value);
    service.createCustodian(custodian.value).then((data) => {
        console.log(data);
        navigateTo('/data_page/custodian');
    })
}

onMounted(() => {

})

</script>

<template>
    <div class="gride">
        <div class="col-12">
            <div class="card">
                <h5>新增保管人</h5>
                <div class="col-12">
                    <div class="field col">
                        <label class="mr-1 block" for="custodian_id">保管人代號</label>
                        <InputText id="custodian_id" type="text" v-model="custodian.code" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-4">
                        <label class="mr-1 block" for="custodian_name">姓名</label>
                        <InputText id="custodian_name" type="text" v-model="custodian.name" />
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="custodian__unit_number">身分證字號</label>
                        <InputText id="custodian__unit_number" type="text" v-model="custodian.id_number" />
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="custodian__birth_date">生日</label>
                        <Calendar id="custodian__birth_date" type="text" v-model="custodian.birthday" />
                    </div>
                </div>
                 <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-4">
                        <label class="mr-1 block" for="custodian_phone">連絡電話</label>
                        <InputText id="custodian_phone" type="text" v-model="custodian.contact_number" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="custodian__mobile_number">行動電話</label>
                        <InputText id="custodian__mobile_number" type="text" v-model="custodian.mobile_number" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-12 md:col-3">
                        <label class="block" for="department">部門群組</label>
                        <Dropdown disabled id="departmentGroupId" v-model="departmentGroupIdItem" :options="departmentGroupIdItems" optionLabel="name" placeholder="Select One"></Dropdown>
                        <Dropdown disabled id="department" v-model="departmentItem" :options="departmentItems" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col-12 md:col-3">
                        <label class="block" for="state">職務名稱</label>
                        <Dropdown disabled id="state" v-model="positionItem" :options="positionItems" optionLabel="name" placeholder="Select One"></Dropdown>
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col">
                        <label class="mr-1 block" for="custodian_email">電子郵件</label>
                        <InputText id="custodian_email" type="text" v-model="custodian.email" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-12">
                        <label class="mr-1 block" for="custodian_adress">通訊地址</label>
                        <InputText class="w-full" id="custodian_adress" type="text" v-model="custodian.address" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-12">
                        <label class="mr-1 block" for="custodian_memo">備註說明</label>
                        <InputText class="w-full" id="custodian_memo" type="text" v-model="custodian.remarks" />
                    </div>
                </div>
                <div class="col-12 flex justify-content-end">
                    <Button label="確認" class="mr-2 mb-2" @click="submitCustodian"></Button>
                    <NuxtLink to="/data_page/custodian">
                        <Button label="取消" class="p-button-outlined p-button-secondary mr-2 mb-2" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
