<script setup>
import { ref, onMounted } from 'vue';
import AssetStatusService from '~/service/AssetStatusService';

let assetStatuses = ref([])
let loading = ref(true)
const service = new AssetStatusService()

let isAddAssetStatusDialogVisible = ref(false)
let newAssetStatus = ref({
    name: null,
})

let editAssetStatus = ref({
    name: null,
    id: null,
})

let isEditAssetStatusDialogVisible = ref(false)

function showAddAssetStatusDialog() {
    isAddAssetStatusDialogVisible.value = true
}

function submitAddAssetStatus() {
    service.createAssetStatus(newAssetStatus.value).then(res => {
        return res.json()
    }).then(() => {
        loadAssetStatuses()
        newAssetStatus.value.name = null
        isAddAssetStatusDialogVisible.value = false
    })
}

function loadAssetStatuses() {
    service.getAssetStatuses().then(res => {
        return res.json()
    }).then((data) => {
        assetStatuses.value = data.asset_statuses
        loading.value = false
    })
}

function showEditAssetStatus(assetStatus) {
    isEditAssetStatusDialogVisible.value = true
    editAssetStatus.value.name = assetStatus.name
    editAssetStatus.value.id = assetStatus.id
}

function submitEditAssetStatus() {
    service.updateAssetStatus(editAssetStatus.value).then(res => {
        return res.json()
    }).then(() => {
        loadAssetStatuses()
        isEditAssetStatusDialogVisible.value = false
    })
}

function cancelEdit() {
    isEditAssetStatusDialogVisible.value = false
}

onMounted(() => {
    loadAssetStatuses()
})
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>資產狀態管理</h5>
                <div class="col-12 flex justify-content-end">
                    <Button label="新增" class="p-button-outlined p-button-secondary mr-2 mb-2" @click="showAddAssetStatusDialog()"/>
                </div>
                <DataTable :loading="loading" :value="assetStatuses" showGridlines>
                    <Column field="name" header="狀態名稱"></Column>
                    <Column header="操作">
                        <template #body="slotProps">
                            <Button type="button" @click="showEditAssetStatus(slotProps.data)" label="編輯" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
    <Dialog v-bind:visible="isAddAssetStatusDialogVisible" header="新增狀態" modal>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="asset_status_name" class="font-semibold w-6rem">狀態名稱</label>
            <InputText id="asset_status_name" class="flex-auto" v-model="newAssetStatus.name"/>
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="isAddAssetStatusDialogVisible = false"></Button>
            <Button type="button" label="Save" @click="submitAddAssetStatus()"></Button>
        </div>
    </Dialog>
    <Dialog v-bind:visible="isEditAssetStatusDialogVisible" header="編輯狀態" modal>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="edit_asset_status_name" class="font-semibold w-6rem">狀態名稱</label>
            <InputText id="edit_asset_status_name" class="flex-auto" v-model="editAssetStatus.name"/>
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="cancelEdit()"></Button>
            <Button type="button" label="Save" @click="submitEditAssetStatus()"></Button>
        </div>
    </Dialog>
</template>

<style scoped>

</style>
