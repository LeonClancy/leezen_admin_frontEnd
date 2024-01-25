<template>
    <div class="gride">
        <div class="col-12">
            <div class="card">
                <h5>新增資產設備</h5>
                <div class="col-12 flex justify-content-end">
                    <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
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
import { Position, Department} from "@/types/custodian"
const positionItem = ref({name:'部長', code:0});
const positionItems = ref([
    { name: '部長', code: Position.部長 },
    { name: '科長', code: Position.科長 },
    { name: '課長', code: Position.課長 }
]);
const departmentGroupIdItem = ref({name:'011', code:'011'});
const departmentGroupIdItems = ref([
    { name:'011', code:'011' },
    { name: '012', code: '012' },
]);
const departmentItem = ref({name:'康樂部', code:Department.康樂部});
const departmentItems = ref([
    { name:'康樂部', code:Department.康樂部 },
    { name: '司法部', code: Department.司法部 },
    { name: '風紀部', code: Department.風紀部 }
]);

async function confirm(){

}

</script>