<script setup lang="ts">
import DepartmentService from '~/service/DepartmentService';
import CustodianService from '~/service/CustodianService';
import CategoryService from '~/service/CategoryService';
import AcquisitionSourceService from '~/service/AcquisitionSourceService';
import useAssetAPI from '~/composables/api/useAssetAPI';
import { CreateAssetRequest } from '~/types/assets';
import { useToast } from 'primevue/usetoast';

let departmentService = new DepartmentService();
let custodianService = new CustodianService();
let categorieService = new CategoryService();
let acquisitionSourceService = new AcquisitionSourceService();
const { createAsset } = useAssetAPI()

const toast = useToast();

let departments = ref([]);
let custodians = ref([]);
let categories = ref([]);
let sources = ref([]);

const createAssetData = ref<CreateAssetRequest>({
    name:'',
    brand_model:'',
    specifications_detail:'',
    product_serial_number:'',
    acquisition_date: '',
    acquisition_source_id: 0,
    useful_life_years: 0,
    acquisition_cost: 0,
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


async function submitAsset() {
    validate()
    await createAsset(createAssetData.value)
    navigateTo('/data_page/asset_equipment');
}

function validate() {
    if (!createAssetData.value.name) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入資產名稱', life: 3000 });
        throw new Error('請輸入資產名稱');
    }
    if (!createAssetData.value.product_serial_number) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入產品序號', life: 3000 });
        throw new Error('請輸入產品序號');
    }
    if (!createAssetData.value.brand_model) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入型號/地號/地址', life: 3000 });
        throw new Error('請輸入型號/地號/地址');
    }
    if (!createAssetData.value.specifications_detail) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入規格明細', life: 3000 });
        throw new Error('請輸入規格明細');
    }
    if (!createAssetData.value.acquisition_date) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入取得日期', life: 3000 });
        throw new Error('請輸入取得日期');
    }
    if (!createAssetData.value.acquisition_source_id) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入取得來源', life: 3000 });
        throw new Error('請輸入取得來源');
    }
    if (!createAssetData.value.useful_life_years) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入耐用年限', life: 3000 });
        throw new Error('請輸入耐用年限');
    }
    if (!createAssetData.value.acquisition_cost) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入取得成本', life: 3000 });
        throw new Error('請輸入取得成本');
    }
    if (!createAssetData.value.department_id) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入部門群組', life: 3000 });
        throw new Error('請輸入部門群組');
    }
    if (!createAssetData.value.custodian_id) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入保管人', life: 3000 });
        throw new Error('請輸入保管人');
    }
    if (!createAssetData.value.category_id) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入資產類型', life: 3000 });
        throw new Error('請輸入資產類型');
    }
    if (!createAssetData.value.location) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入存置地點', life: 3000 });
        throw new Error('請輸入存置地點');
    }
    if (!createAssetData.value.unit) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入數量單位', life: 3000 });
        throw new Error('請輸入數量單位');
    }
    if (!createAssetData.value.warranty_period) {
        toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入產品保固年限', life: 3000 });
        throw new Error('請輸入產品保固年限');
    }
}

onMounted(() => {
    departmentService.getDepartmentsOptions().then((data) => {
        departments.value = data;
    });
    custodianService.getCustodianOptions().then((data) => {
        custodians.value = data.custodians;
    });
    categorieService.getCategoryOptions().then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data);
        categories.value = data.categories;
    }).catch((err) => {
        console.log(err);
    });
    acquisitionSourceService.getAcquisitionSources().then((res) => {
        return res.json()
    }).then((data) => {
        sources.value = data.acquisition_sources;
    }).catch((err) => {
        console.log(err);
    });
});

</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>新增資產設備</h5>
                <div class="col-12 flex flex-column md:flex-row">
                    <!-- <div class="field col-4">
                        <label class="mr-1 block" for="asset_id">資產編號</label>
                        <InputText id="asset_id" type="text" v-model="createAssetData.asset_number" />
                    </div> -->
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_name">資產名稱<span class="required">*</span></label>
                        <InputText id="asset_name" type="text" v-model="createAssetData.name" />
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_memo">備註/狀態（選填）</label>
                        <InputText id="asset_memo" type="text" v-model="createAssetData.memo" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_product_code">產品序號<span class="required">*</span></label>
                        <InputText id="asset_product_code" type="text" v-model="createAssetData.product_serial_number" />
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_type">型號/地號/地址<span class="required">*</span></label>
                        <InputText id="asset_type" type="text" v-model="createAssetData.brand_model" />
                    </div>
                </div>
                <div class="col-12">
                    <div class="field col-12">
                        <label class="mr-1 block" for="asset_type_detial">規格明細<span class="required">*</span></label>
                        <Textarea class="w-full" id="asset_type_detial" type="text" v-model="createAssetData.specifications_detail" />
                    </div>
                </div>
                <div class="flex flex-row flex-wrap flex-row md:flex-row">
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="asset_get_day">取得日期<span class="required">*</span></label>
                            <Calendar id="asset_get_day" type="text" v-model="createAssetData.acquisition_date" date-format="yy/mm/dd"/>
                        </div>
                    </div>
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="acquisition_source">取得來源<span class="required">*</span></label>
                            <Dropdown class="w-full md:w-16rem" 
                                id="acquisition_source" 
                                v-model="createAssetData.acquisition_source_id" 
                                :options="sources" 
                                optionValue="id" 
                                optionLabel="name"
                                filter />
                        </div>
                    </div>
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="useful_life">耐用年限<span class="required">*</span></label>
                            <InputNumber id="useful_life" type="text" v-model="createAssetData.useful_life_years" />
                        </div>
                    </div>
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="useful_life">取得成本<span class="required">*</span></label>
                            <InputNumber id="useful_life" type="text" v-model="createAssetData.acquisition_cost" :maxFractionDigits="5" />
                        </div>
                    </div>
                    <!-- <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="current_value">現值</label>
                            <InputNumber id="current_value" type="text" v-model="createAssetData.current_value" :maxFractionDigits="5" />
                        </div>
                    </div> -->
                </div>
                <div class="flex flex-row flex-wrap flex-row md:flex-row">
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="department">部門群組<span class="required">*</span></label>
                            <Dropdown class="w-full md:w-16rem" id="department" 
                                v-model="createAssetData.department_id" 
                                :options="departments" 
                                optionValue="id" 
                                optionLabel="name"
                                filter />
                        </div>
                    </div>
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="custodian_id">保管人<span class="required">*</span></label>
                            <Dropdown class="w-full md:w-16rem" id="custodian_id" 
                                v-model="createAssetData.custodian_id" 
                                :options="custodians" 
                                optionValue="id" 
                                optionLabel="name"
                                filter />
                        </div>
                    </div>
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="category">資產類型<span class="required">*</span></label>
                            <Dropdown class="w-full md:w-16rem" id="category" 
                                v-model="createAssetData.category_id" 
                                :options="categories" 
                                optionValue="id" 
                                optionLabel="name" 
                                filter />
                        </div>
                    </div>
                </div>
                <div class="flex flex-row flex-wrap flex-row md:flex-row">
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="location">存置地點<span class="required">*</span></label>
                            <InputText id="location" type="text" v-model="createAssetData.location" />
                        </div>
                    </div>
                    <div class="flex m-3">
                        <div class="field">
                            <label class="block" for="unit">數量單位<span class="required">*</span></label>
                            <InputText id="unit" type="text" v-model="createAssetData.unit" />
                        </div>
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col">
                        <label class="mr-1 block" for="vendor_name">銷售維修廠商（選填）</label>
                        <InputText id="vendor_name" type="text" v-model="createAssetData.service_vendor" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="vendor_phone">維修連絡電話（選填）</label>
                        <InputText id="vendor_phone" type="text" v-model="createAssetData.service_contact_phone" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="vendor_manager_name">廠商聯絡人（選填）</label>
                        <InputText id="vendor_manager_name" type="text" v-model="createAssetData.contact_person" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col">
                        <label class="mr-1 block" for="warranty_period">產品保固年限<span class="required">*</span></label>
                        <Calendar id="warranty_period" type="text" v-model="createAssetData.warranty_period" date-format="yy/mm/dd" />
                    </div>
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

<style scoped>
.required {
    color: red;
    /* font-size: 15px; */
}
</style>
