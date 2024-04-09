<script setup>
import { ref, onMounted } from 'vue';
import AcquisitionSourceService from '~/service/AcquisitionSourceService';

let sources = ref([])
let loading = ref(true)
const service = new AcquisitionSourceService()

let isAddSourceDialogVisible = ref(false)
let newSource = ref({
    name: null,
})

let editSource = ref({
    name: null,
    id: null,
})

let isEditSourceDialogVisible = ref(false)

function showAddSourceDialog() {
    isAddSourceDialogVisible.value = true
}

function submitAddSource() {
    service.createAcquisitionSource(newSource.value).then(res => {
        return res.json()
    }).then((data) => {
        loadSources()
        isAddSourceDialogVisible.value = false
    })
    isAddSourceDialogVisible.value = false
}

function loadSources() {
    service.getAcquisitionSources().then(res => {
        return res.json()
    }).then((data) => {
        sources.value = data.acquisition_sources
        loading.value = false
    })
}

function showEditSource(source) {
    isEditSourceDialogVisible.value = true
    editSource.value.name = source.name
    editSource.value.id = source.id
}

function submitEditSource() {
    service.updateAcquisitionSource(editSource.value).then(res => {
        return res.json()
    }).then((data) => {
        loadSources()
        isEditSourceDialogVisible.value = false
    })
}

function cancelEdit() {
    isEditSourceDialogVisible.value = false
}

onMounted(() => {
    loadSources()
})
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>資產來源管理</h5>
                <div class="col-12 flex justify-content-end">
                    <Button label="新增" class="p-button-outlined p-button-secondary mr-2 mb-2" @click="showAddSourceDialog()"/>
                </div>
                <DataTable :loading="loading" :value="sources" showGridlines>
                    <Column field="name" header="來源名稱"></Column>
                    <Column header="操作">
                        <template #body="slotProps">
                            <Button type="button" @click="showEditSource(slotProps.data)" label="編輯" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
    <Dialog v-bind:visible="isAddSourceDialogVisible" header="新增來源" modal>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="name" class="font-semibold w-6rem">來源名稱</label>
            <InputText id="name" class="flex-auto" v-model="newSource.name"/>
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="isAddSourceDialogVisible = false"></Button>
            <Button type="button" label="Save" @click="submitAddSource()"></Button>
        </div>
    </Dialog>
    <Dialog v-bind:visible="isEditSourceDialogVisible" header="編輯來源" modal>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="name" class="font-semibold w-6rem">來源名稱</label>
            <InputText id="name" class="flex-auto" v-model="editSource.name"/>
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="cancelEdit()"></Button>
            <Button type="button" label="Save" @click="submitEditSource()"></Button>
        </div>
    </Dialog>
</template>

<style scoped>

</style>