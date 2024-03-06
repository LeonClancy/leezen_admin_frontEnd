<script setup lang="ts">
import { useMembersStore } from "@/store/useMembersStore"
import useMemberAPI from "~/composables/api/useMemberAPI"
import { Member, type SearchMemberRequest } from "~/types/member"

const { membersList } = storeToRefs(useMembersStore())
const { setCurrentMemberId, setMembersList } = useMembersStore()
const { searchMembers, getMembers } = useMemberAPI()
const { dateFormaterYYMMDD } = useUtils()

const loading = ref(true)
const searchInput = ref<SearchMemberRequest>({
  name: '',
  email: '',
  created_at_start: '',
  created_at_end: '',
  custodian_name: ''
})
onMounted(() => {
  initData()
})

async function initData() {
  setMembersList(await getMembers())
  loading.value = false
}

function viewInfo(id: string) {
  setCurrentMemberId(id)
  navigateTo(`/manage/member/${id}`)
}
function checkSearhInput() {
  return Object.values(searchInput.value).some(value => value !== '')
}
async function search() {
  let users: Member[];
  loading.value = true
  if(searchInput.value.created_at_start)searchInput.value.created_at_start = dateFormaterYYMMDD(new Date(searchInput.value.created_at_start))
  if(searchInput.value.created_at_end)searchInput.value.created_at_end = dateFormaterYYMMDD(new Date(searchInput.value.created_at_end))
  if (checkSearhInput()) users = await searchMembers(searchInput.value)
  else users = await searchMembers(null)
  setMembersList(users)
  loading.value = false
}

</script>
<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="col-12 flex flex-column md:flex-row">
          <div class="mr-2">
            <label class="mr-1 block" for="namwe">會員姓名</label>
            <InputText id="namwe" type="text" v-model="searchInput.name" />
          </div>
          <div class="mr-2">
            <label class="mr-1 block" for="email">會員信箱</label>
            <InputText id="email" type="text" v-model="searchInput.email" />
          </div>
          <div>
            <label class="mr-1 block" for="custodian_namwe">保管人姓名</label>
            <InputText id="custodian_namwe" type="text" v-model="searchInput.custodian_name" />
          </div>
        </div>
        <div class="col-12 flex flex-column md:flex-row">
          <div class="mr-2">
            <label class="mr-1 block" for="create_at_start_date">創建日期_起始</label>
            <Calendar id="create_at_start_date" type="text" v-model="searchInput.created_at_start" />
          </div>
          <div>
            <label class="mr-1 block" for="create_at_start_date">創建日期_結束</label>
            <Calendar id="create_at_start_date" type="text" v-model="searchInput.created_at_end" />
          </div>
        </div>
        <div class="col-12 flex justify-content-end">
          <Button label="搜尋" class="p-button-outlined p-button-secondary mr-2 mb-2" @click="search" />
        </div>
      </div>
    </div>
  </div>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>會員管理</h5>
        <div class="col-12 flex justify-content-end">
          <NuxtLink to="member/create">
            <Button label="新增" class="p-button-outlined p-button-secondary mr-2 mb-2" />
          </NuxtLink>
          <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
        </div>
        <DataTable :loading="loading" :value="membersList" paginator showGridlines :rows="10" dataKey="id">
          <Column field="index" header="編號" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.id }}
            </template>
          </Column>
          <Column field="name" header="姓名" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.name }}
            </template>
          </Column>
          <Column field="email" header="email" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.email }}
            </template>
          </Column>
          <Column field="code" header="保管人名稱" style="min-width: 12rem">
            <template #body="{ data }">
              {{ data.custodian_name }}
            </template>
          </Column>
          <Column field="custodian_operation" header="操作" style="min-width: 12rem">
            <template #body="{ data }">
              <Button @click="viewInfo(data.id)" label="查看/編輯" class="p-button-rounded p-button-success mr-2 mb-2" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>