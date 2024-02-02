<script setup lang="ts">
import AssetService from '~/service/AssetService';
import DepartmentService from '~/service/DepartmentService';
import CustodianService from '~/service/CustodianService';

let service = new AssetService();
let departmentService = new DepartmentService();
let custodianService = new CustodianService();

let departments = ref([]);
let custodians = ref([]);

const createAssetData = ref({
    asset_number:'',
    name:'',
    brand_model:'',
    specifications_detail:'',
    product_serial_number:'',
    acquisition_date: '',
    acquisition_source: '',
    useful_life_years: '',
    acquisition_cost: '',
    current_value: '',
    service_vendor: '',
    service_contact_phone: '',
    contact_person: '',
    warranty_period: '',
    warranty_expiration_date: '',
    department_id: '',
    custodian_id: '',
})


async function submitAsset() {
    service.createAsset(createAssetData.value).then((data) => {
        console.log(data);
        navigateTo('/data_page/asset_equipment');
    });
}

onMounted(() => {
    departmentService.getDepartmentsOptions().then((data) => {
        departments.value = data;
    });
    custodianService.getCustodianOptions().then((data) => {
        custodians.value = data.custodians;
    });
});

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>新增資產設備</h5>
                <div class="col-12 flex justify-content-end">
                    <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_id">資產編號</label>
                        <InputText id="asset_id" type="text" v-model="createAssetData.asset_number" />
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_name">資產名稱</label>
                        <InputText id="asset_name" type="text" v-model="createAssetData.name" />
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_type">廠牌型號</label>
                        <InputText id="asset_type" type="text" v-model="createAssetData.brand_model" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-8">
                        <label class="mr-1 block" for="asset_type_detial">規格明細</label>
                        <InputText class="w-full" id="asset_type_detial" type="text" v-model="createAssetData.specifications_detail" />
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_product_code">產品序號</label>
                        <InputText id="asset_product_code" type="text" v-model="createAssetData.product_serial_number" />
                    </div>
                </div>
                <!-- <div class="col-12 flex">
                    <div class="field col-12">
                        <label class="mr-1 block">分類類別</label>
                        <Dropdown id="types" v-model="typeItem" :options="typeItems" optionLabel="name"
                            placeholder="Select One">
                        </Dropdown>
                        <Dropdown id="type_name" v-model="typeNameItem" :options="typeNameItems" optionLabel="name"
                            placeholder="Select One"></Dropdown>
                        <InputText id="asset_type_detial" type="text" />
                    </div>
                </div> -->
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col">
                        <label class="mr-1 block" for="asset_get_day">取得日期</label>
                        <InputText id="asset_get_day" type="text" v-model="createAssetData.acquisition_date" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="asset_">取得來源</label>
                        <InputText id="asset_get_day" type="text" v-model="createAssetData.acquisition_source" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="useful_life">耐用年限</label>
                        <InputText id="useful_life" type="text" v-model="createAssetData.useful_life_years" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="useful_life">取得成本</label>
                        <InputText id="useful_life" type="text" v-model="createAssetData.acquisition_cost" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="current_value">現值</label>
                        <InputText id="current_value" type="text" v-model="createAssetData.current_value" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-3">
                        <label class="mr-1 block" for="department">部門群組</label>
                        <Dropdown id="department" v-model="createAssetData.department_id" :options="departments" optionValue="id" optionLabel="name" />
                    </div>
                    <div class="field col-3">
                        <label class="mr-1 block" for="custodian_id">保管人編號</label>
                        <Dropdown id="custodian_id" v-model="createAssetData.custodian_id" :options="custodians" optionValue="id" optionLabel="name" />
                    </div>
                    <div class="field col-3">
                        <label class="mr-1 block" for="position">職務名稱</label>
                        <InputText id="position" type="text" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col">
                        <label class="mr-1 block" for="vendor_name">銷售維修廠商</label>
                        <InputText id="vendor_name" type="text" v-model="createAssetData.service_vendor" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="vendor_phone">維修連絡電話</label>
                        <InputText id="vendor_phone" type="text" v-model="createAssetData.service_contact_phone" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="vendor_manager_name">聯絡人</label>
                        <InputText id="vendor_manager_name" type="text" v-model="createAssetData.contact_person" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col">
                        <label class="mr-1 block" for="warranty_period">保固年限</label>
                        <InputText id="warranty_period" type="text" v-model="createAssetData.warranty_period" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="warrant_date">保固到期日</label>
                        <InputText id="warrant_date" type="text" v-model="createAssetData.warranty_expiration_date" />
                    </div>
                </div>
                <div class="col-12 flex justify-content-end">
                    <!-- 這三個在新增的時候應該不需要吧?!要的話再打開註解即可 -->
                    <!-- <Button label="顯示歷史保管人明細" class="p-button-rounded mr-2 mb-2 col-2" />
                    <Button label="顯示資產設備維修紀錄" class="p-button-rounded mr-2 mb-2 col-2" />
                    <Button label="顯示資產設備折舊狀況" class="p-button-rounded mr-2 mb-2 col-2" /> -->
                    <Button label="上傳照片" icon="pi pi-bookmark" class="mr-2 mb-2"></Button>
                </div>
                <div class="col-12 flex justify-content-end">
                    <Button label="確認" class="mr-2 mb-2" @click="submitAsset"></Button>
                    <NuxtLink to="/data_page/custodian">
                        <Button label="取消" class="p-button-outlined p-button-secondary mr-2 mb-2" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
