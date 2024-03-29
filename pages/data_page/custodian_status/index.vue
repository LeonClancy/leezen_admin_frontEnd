<script setup>
import { ref, onMounted } from 'vue';
import StatusService from '~/service/StatusService';

let status = ref([])
let loading = ref(true)
const service = new StatusService()

let isAddStatusDialogVisible = ref(false)
let newStatus = ref({
    name: null,
})

let editStatus = ref({
    name: null,
    id: null,
})

let isEditStatusDialogVisible = ref(false)

function showAddStatusDialog() {
    isAddStatusDialogVisible.value = true
}

function submitAddStatus() {
    service.createStatus(newStatus.value).then(res => {
        return res.json()
    }).then((data) => {
        loadPostions()
        isAddStatusDialogVisible.value = false
    })
    isAddStatusDialogVisible.value = false
}

function loadPostions() {
    service.getStatus().then(res => {
        return res.json()
    }).then((data) => {
        status.value = data.status
        loading.value = false
    })
}

function showEditStatus(Status) {
    isEditStatusDialogVisible.value = true
    editStatus.value.name = Status.name
    editStatus.value.id = Status.id
}

function submitEditStatus() {
    service.updateStatus(editStatus.value).then(res => {
        return res.json()
    }).then((data) => {
        loadPostions()
        isEditStatusDialogVisible.value = false
    })
}

function cancelEdit() {
    isEditStatusDialogVisible.value = false
}

onMounted(() => {
    loadPostions()
})
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>保管人狀態管理</h5>
                <div class="col-12 flex justify-content-end">
                    <Button label="新增" class="p-button-outlined p-button-secondary mr-2 mb-2" @click="showAddStatusDialog()"/>
                </div>
                <DataTable :loading="loading" :value="status" showGridlines>
                    <Column field="name" header="狀態名稱"></Column>
                    <Column header="操作">
                        <template #body="slotProps">
                            <Button type="button" @click="showEditStatus(slotProps.data)" label="編輯" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
    <Dialog v-bind:visible="isAddStatusDialogVisible" header="新增狀態" modal>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="name" class="font-semibold w-6rem">狀態名稱</label>
            <InputText id="name" class="flex-auto" v-model="newStatus.name"/>
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="isAddStatusDialogVisible = false"></Button>
            <Button type="button" label="Save" @click="submitAddStatus()"></Button>
        </div>
    </Dialog>
    <Dialog v-bind:visible="isEditStatusDialogVisible" header="編輯狀態" modal>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="name" class="font-semibold w-6rem">狀態名稱</label>
            <InputText id="name" class="flex-auto" v-model="editStatus.name"/>
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="cancelEdit()"></Button>
            <Button type="button" label="Save" @click="submitEditStatus()"></Button>
        </div>
    </Dialog>
</template>

<style scoped>

</style>