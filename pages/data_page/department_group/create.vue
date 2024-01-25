<template>
    <div class="gride">
        <div class="col-12">
            <div class="card">
                <h5>新增部門群組</h5>
                <div class="col-12 flex justify-content-end">
                    <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
                </div>
                <div class="col-12 flex">
                    <div class="field col">
                        <label class="mr-1 block" for="department_id">部門代號</label>
                        <InputText id="department_id" type="text" />
                    </div>
                    <div class="field col-4">
                        <label class="mr-1 block" for="department_name">部門名稱</label>
                        <InputText id="department_name" type="text" />
                    </div>
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


async function confirm(){

}

</script>