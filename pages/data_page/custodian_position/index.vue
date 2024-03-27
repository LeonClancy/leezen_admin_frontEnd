<script setup lang="ts">
import { ref, onMounted } from 'vue';
import PositionService from '~/service/PositionService';

let positions = ref([])
let loading = ref(true)
const service = new PositionService()

let isAddPositionDialogVisible = ref(false)
let newPosition = ref({
    name: null,
})

let editPosition = ref({
    name: null,
    id: null,
})

let isEditPositionDialogVisible = ref(false)

function showAddPositionDialog() {
    isAddPositionDialogVisible.value = true
}

function submitAddPosition() {
    service.createPosition(newPosition.value).then(res => {
        return res.json()
    }).then((data) => {
        loadPostions()
        isAddPositionDialogVisible.value = false
    })
    isAddPositionDialogVisible.value = false
}

function loadPostions() {
    service.getPositions().then(res => {
        return res.json()
    }).then((data) => {
        positions.value = data.positions
        loading.value = false
    })
}

function showEditPosition(position) {
    isEditPositionDialogVisible.value = true
    editPosition.value.name = position.name
    editPosition.value.id = position.id
}

function submitEditPosition() {
    service.updatePosition(editPosition.value).then(res => {
        return res.json()
    }).then((data) => {
        loadPostions()
        isEditPositionDialogVisible.value = false
    })
}

function cancelEdit() {
    isEditPositionDialogVisible.value = false
}

onMounted(() => {
    loadPostions()
})
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>保管人職務管理</h5>
                <div class="col-12 flex justify-content-end">
                    <Button label="新增" class="p-button-outlined p-button-secondary mr-2 mb-2" @click="showAddPositionDialog()"/>
                </div>
                <DataTable :loading="loading" :value="positions" showGridlines>
                    <Column field="name" header="職務名稱"></Column>
                    <Column header="操作">
                        <template #body="slotProps">
                            <Button type="button" @click="showEditPosition(slotProps.data)" label="編輯" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
    <Dialog v-bind:visible="isAddPositionDialogVisible" header="新增職務" modal>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="name" class="font-semibold w-6rem">職務名稱</label>
            <InputText id="name" class="flex-auto" v-model="newPosition.name"/>
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="isAddPositionDialogVisible = false"></Button>
            <Button type="button" label="Save" @click="submitAddPosition()"></Button>
        </div>
    </Dialog>
    <Dialog v-bind:visible="isEditPositionDialogVisible" header="編輯職務" modal>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="name" class="font-semibold w-6rem">職務名稱</label>
            <InputText id="name" class="flex-auto" v-model="editPosition.name"/>
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="cancelEdit()"></Button>
            <Button type="button" label="Save" @click="submitEditPosition()"></Button>
        </div>
    </Dialog>
</template>

<style scoped>

</style>