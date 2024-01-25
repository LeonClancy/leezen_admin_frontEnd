<template>
    <div class="gride">
        <div class="col-12">
            <div class="card">
                <h5>新增資產設備</h5>
                <div class="col-12 flex justify-content-end">
                    <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_id">資產編號</label>
                        <InputText id="asset_id" type="text" v-model="createAssetData.id" />
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_name">資產名稱</label>
                        <InputText id="asset_name" type="text" v-model="createAssetData.name" />
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_type">廠牌型號</label>
                        <InputText id="asset_type" type="text" v-model="createAssetData.type" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col-8">
                        <label class="mr-1 block" for="asset_type_detial">規格明細</label>
                        <InputText class="w-full" id="asset_type_detial" type="text" />
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="asset_product_code">產品序號</label>
                        <InputText id="asset_product_code" type="text" v-model="createAssetData.product_code" />
                    </div>
                </div>
                <div class="col-12 flex">
                    <div class="field col-12">
                        <label class="mr-1 block">分類類別</label>
                        <Dropdown id="types" v-model="typeItem" :options="typeItems" optionLabel="name"
                            placeholder="Select One">
                        </Dropdown>
                        <Dropdown id="type_name" v-model="typeNameItem" :options="typeNameItems" optionLabel="name"
                            placeholder="Select One"></Dropdown>
                        <InputText id="asset_type_detial" type="text" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col">
                        <label class="mr-1 block" for="asset_get_day">取得日期</label>
                        <InputText id="asset_get_day" type="text" v-model="createAssetData.acquire_date" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="gaint_source">取得來源</label>
                        <Dropdown id="gaint_source" v-model="gaintSourceItem" :options="gaintSourceItems" optionLabel="name"
                            placeholder="Select One"></Dropdown>
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="useful_life">耐用年限</label>
                        <InputText id="useful_life" type="text" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="useful_life">取得成本</label>
                        <InputText id="useful_life" type="text" v-model="createAssetData.acquisition_cost" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="current_value">現值</label>
                        <InputText id="current_value" type="text" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col">
                        <label class="mr-1 block" for="custodian_id">保管人編號</label>
                        <InputText id="custodian_id" type="text" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="custodian_name">保管人姓名</label>
                        <InputText id="custodian_name" type="text" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="department">部門群組</label>
                        <div class="flex flex-column md:flex-row">
                            <InputText id="department" type="text" />
                            <InputText id="department" type="text" />
                        </div>
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="position">職務名稱</label>
                        <InputText id="position" type="text" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col">
                        <label class="mr-1 block" for="vendor_name">銷售維修廠商</label>
                        <InputText id="vendor_name" type="text" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="vendor_phone">維修連絡電話</label>
                        <InputText id="vendor_phone" type="text" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="vendor_manager_name">聯絡人</label>
                        <InputText id="vendor_manager_name" type="text" />
                    </div>
                </div>
                <div class="col-12 flex flex-column md:flex-row">
                    <div class="field col">
                        <label class="mr-1 block" for="warranty_period">保固年限</label>
                        <InputText id="warranty_period" type="text" />
                    </div>
                    <div class="field col">
                        <label class="mr-1 block" for="warrant_date">保固到期日</label>
                        <InputText id="warrant_date" type="text" />
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
                    <Button label="確認" class="mr-2 mb-2" @click="confirm"></Button>
                    <NuxtLink to="/data_page/custodian">
                        <Button label="取消" class="p-button-outlined p-button-secondary mr-2 mb-2" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Asset } from "~/types/assets"
const createAssetData = ref<Asset>({
    id:'',
    name:'',
    type:'',
    product_code:'',
    acquire_date:'',
    acquisition_cost:null
})


async function confirm() {

}

</script>