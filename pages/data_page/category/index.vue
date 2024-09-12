<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>資產類型管理</h5>
        <div class="col-12 flex justify-content-end">
            <Button label="新增" class="p-button-outlined p-button-secondary mr-2 mb-2" @click="addCategory(null)" />
        </div>
        <TreeTable 
            :value="categories"
            :loading="loading" 
            :filters="filters"
        >
            <template #header>
                <div class="text-right">
                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                            <InputText v-model="filters['global']" placeholder="Global Search" />
                    </IconField>
                </div>
            </template>
            <Column field="name" header="類型名稱">
                <template #filter>
                    <InputText v-model="filters['name']" class="p-column-filter" />
                </template>
                <template #body="slotProps">
                    {{ getName(slotProps.node) }}
                </template>
            </Column>
            <Column field="code" header="類型代號" expander="true">
                <template #filter>
                    <InputText v-model="filters['code']" class="p-column-filter" />
                </template>
                <template #body="slotProps">
                    {{ slotProps.node.code }}
                </template>
            </Column>
            <Column header="操作">
            <template #body="slotProps">
                <div class="flex flex-wrap gap-2">
                    <Button @click="editeCategory(slotProps.node)" severity="success" icon="pi pi-pencil" type="button" rounded/>
                    <Button @click="addCategory(slotProps.node)" type="button" icon="pi pi-plus" rounded
                        v-if="slotProps.node.depth < 1"/>
                </div>
            </template>
            </Column>
        </TreeTable>
      </div>
    </div>
  </div>
    <Dialog v-bind:visible="isaddCategoryDialogVisble" modal>
        <span class="p-text-secondary block mb-5" v-if="!newCategoryParent">新增類型</span>
        <span class="p-text-secondary block mb-5" v-else>新增 {{ newCategoryParent.name }} 子類型</span>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="name" class="font-semibold w-6rem">類型名稱</label>
            <InputText id="name" class="flex-auto" v-model="newCategory.name"/>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="code" class="font-semibold w-6rem">類型代號</label>
            <InputText id="code" class="flex-auto" v-model="newCategory.code"/>
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="cancelNewDepartment()"></Button>
            <Button type="button" label="Save" @click="submitDepartment()"></Button>
        </div>
    </Dialog>
    <Dialog v-bind:visible="isEditCategoryDialogVisble" modal>
        <span class="p-text-secondary block mb-5">編輯類型</span>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="name" class="font-semibold w-6rem">類型名稱</label>
            <InputText id="name" class="flex-auto" v-model="editCategory.name"/>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="code" class="font-semibold w-6rem">類型代號</label>
            <InputText id="code" class="flex-auto" v-model="editCategory.code"/>
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="cancelEditCategory()"></Button>
            <Button type="button" label="Save" @click="submitEditCategory()"></Button>
        </div>
    </Dialog>
  <Toast></Toast>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CategoryService from '~/service/CategoryService';

const service = new CategoryService();

let categories = ref([]);

const filters = ref({})

let isaddCategoryDialogVisble = ref(false);
let newCategoryParent = ref(null);
let newCategory = ref({
    name: null,
    code: null,
    id: null,
});

let isEditCategoryDialogVisble = ref(false);
let editCategory = ref({
    name: null,
    code: null,
    id: null,
});

function loadCategories() {
    service.getCategories().then((res) => {
        return res.json()
    }).then((data) => {
        console.log(data);
        
        categories.value = data.categories;
    }).catch((err) => {
        console.log(err);
    });
}

function addCategory(parent) {
    newCategoryParent.value = parent;
    isaddCategoryDialogVisble.value = true;
}

function cancelNewDepartment() {
    isaddCategoryDialogVisble.value = false;
    newCategoryParent.value = null;
}

function submitDepartment() {
    let data = {
        name: newCategory.value.name,
        code: newCategory.value.code,
        parent_id: newCategoryParent.value ? newCategoryParent.value.id : null
    }
    service.createCategory(data).then((res) => {
        return res.json()
    }).then((data) => {
        loadCategories();
        cancelNewDepartment();
    }).catch((err) => {
        console.log(err);
    });
}

function editeCategory(category) {
    editCategory.value = category;
    isEditCategoryDialogVisble.value = true;
}

function cancelEditCategory() {
    isEditCategoryDialogVisble.value = false;
    editCategory.value = {
        name: null,
        code: null,
        id: null,
    };
}

function submitEditCategory() {
    let data = {
        name: editCategory.value.name,
        code: editCategory.value.code,
    }
    service.editCategory(editCategory.value.id, data).then((res) => {
        return res.json()
    }).then((data) => {
        loadCategories();
        cancelEditCategory();
    }).catch((err) => {
        console.log(err);
    });
}

function getName(category) {
    console.log(category);
    if (category.depth == 1) {
        return '> ' + category.name
    }
    return category.name
}

onMounted(() => {
    loadCategories();
})

</script>

<style scoped>

</style>