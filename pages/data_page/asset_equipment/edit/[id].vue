<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRoute } from 'vue-router';
import DepartmentService from '~/service/DepartmentService';
import CustodianService from '~/service/CustodianService';
import CategoryService from '~/service/CategoryService';
import AcquisitionSourceService from '~/service/AcquisitionSourceService';
import useAssetAPI from '~/composables/api/useAssetAPI';
import { useAssetsStore } from '~/store/useAssetsStore';

let departmentService = new DepartmentService();
let custodianService = new CustodianService();
let categorieService = new CategoryService();
let acquisitionSourceService = new AcquisitionSourceService();

const { updateAsset } = useAssetAPI()
const { asset } = storeToRefs(useAssetsStore())

let departments = ref([]);
let custodians = ref([]);
let categories = ref([]);
let sources = ref([]);

const route = useRoute();
const toast = useToast();

const createAssetData = ref({
    name:'',
    brand_model:'',
    specifications_detail:'',
    product_serial_number:'',
    acquisition_date: '',
    acquisition_source_id: 0,
    useful_life_years: 0,
    acquisition_cost: 0,
    current_value: 0,
    service_vendor: '',
    service_contact_phone: '',
    contact_person: '',
    warranty_period: '',
    department_id: 0,
    custodian_id: 0,
    category_id: 0,
    memo: '',
    unit: '',
    location: '',
})

init()

function init(){
    fetchAssets()
    loadDepartments();
    loadCustodians();
    loadCategories();
    loadSources();
}
async function fetchAssets(){
    createAssetData.value = asset.value
}
async function submitAsset() {
    await updateAsset(route.params.id, createAssetData.value)
    toast.add({ severity: 'success', summary: '更新成功', detail: '資產設備已更新', life: 3000});
    navigateTo('/data_page/asset_equipment');
}

function loadDepartments() {
    departmentService.getDepartmentsOptions().then((data) => {
        console.log(data);
        departments.value = data;
    })
}

function loadCustodians() {
    custodianService.getCustodianOptions().then((data) => {
        console.log(data);
        custodians.value = data.custodians;
    })
}

function loadCategories() {
    categorieService.getCategoryOptions().then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data);
        categories.value = data.categories;
    }).catch((err) => {
        console.log(err);
    });
}

function loadSources() {
    acquisitionSourceService.getAcquisitionSources().then((res) => {
        return res.json()
    }).then((data) => {
        sources.value = data.acquisition_sources;
    }).catch((err) => {
        console.log(err);
    });
}

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>編輯資產設備</h5>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_name">資產名稱</label>
                        <InputText id="asset_name" type="text" v-model="createAssetData.name" />
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_memo">備註</label>
                        <InputText id="asset_memo" type="text" v-model="createAssetData.memo" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_product_code">產品序號</label>
                        <InputText id="asset_product_code" type="text" v-model="createAssetData.product_serial_number" />
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_type">廠牌型號</label>
                        <InputText id="asset_type" type="text" v-model="createAssetData.brand_model" />
                    </div>
                </div>
                <div class="col-12">
                    <div class="field col-12">
                        <label class="mr-1 block" for="asset_type_detial">規格明細</label>
                        <Textarea class="w-full" id="asset_type_detial" type="text" v-model="createAssetData.specifications_detail" />
                    </div>
                </div>
                <div class="flex flex-row flex-wrap flex-row md:flex-row">
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="asset_get_day">取得日期</label>
                            <Calendar id="asset_get_day" type="text" v-model="createAssetData.acquisition_date" date-format="yy/mm/dd"/>
                        </div>
                    </div>
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="acquisition_source">取得來源</label>
                            <Dropdown class="w-full md:w-16rem" 
                                id="acquisition_source" 
                                v-model="createAssetData.acquisition_source_id" 
                                :options="sources" 
                                optionValue="id" 
                                optionLabel="name" />
                        </div>
                    </div>
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="useful_life">耐用年限</label>
                            <InputNumber id="useful_life" type="text" v-model="createAssetData.useful_life_years" />
                        </div>
                    </div>
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="useful_life">取得成本</label>
                            <InputNumber id="useful_life" type="text" v-model="createAssetData.acquisition_cost" :maxFractionDigits="5" />
                        </div>
                    </div>
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="current_value">現值</label>
                            <InputNumber id="current_value" type="text" v-model="createAssetData.current_value" :maxFractionDigits="5" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-row flex-wrap flex-row md:flex-row">
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="department">部門群組</label>
                            <Dropdown class="w-full md:w-16rem" id="department" 
                                v-model="createAssetData.department_id" 
                                :options="departments" 
                                optionValue="id" 
                                optionLabel="name" />
                        </div>
                    </div>
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="custodian_id">保管人編號</label>
                            <Dropdown class="w-full md:w-16rem" id="custodian_id" 
                                v-model="createAssetData.custodian_id" 
                                :options="custodians" 
                                optionValue="id" 
                                optionLabel="name" />
                        </div>
                    </div>
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="category">類型</label>
                            <Dropdown class="w-full md:w-16rem" id="category" v-model="createAssetData.category_id" :options="categories" optionValue="id" optionLabel="name" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-row flex-wrap flex-row md:flex-row">
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="location">存置地點</label>
                            <InputText id="location" type="text" v-model="createAssetData.location" />
                        </div>
                    </div>
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="unit">單位</label>
                            <InputText id="unit" type="text" v-model="createAssetData.unit" />
                        </div>
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
                        <Calendar id="warranty_period" type="text" v-model="createAssetData.warranty_period" date-format="yy/mm/dd" />
                    </div>
                </div>
                <div class="col-12 flex justify-content-end">
                    <Button label="確認" class="mr-2 mb-2" @click="submitAsset"></Button>
                    <NuxtLink to="/data_page/asset_equipment">
                        <Button label="取消" class="p-button-outlined p-button-secondary mr-2 mb-2" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
