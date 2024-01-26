<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>部門群組</h5>
        <div class="col-12 flex justify-content-end">
          <NuxtLink to="department_group/create">
            <Button label="新增" class="p-button-outlined p-button-secondary mr-2 mb-2" />
          </NuxtLink>
          <Button label="列印" class="p-button-outlined p-button-secondary mr-2 mb-2" />
        </div>
        <TreeTable :value="departmentList" :loading="loading">
          <Column field="id" header="部門代號"></Column>
          <Column field="name" header="部門名稱" expander="true"></Column>
          <Column headerStyle="width: 10rem" header="操作">
                <template #body="slotProps">
                    <div class="flex flex-wrap gap-2">
                        <Button @click="viewInfo(slotProps.node.data.id)" type="button" icon="pi pi-search" rounded/>
                        <Button @click="editData(slotProps.node.data.id)" type="button" icon="pi pi-pencil" rounded severity="success" />
                    </div>
                </template>
            </Column>
        </TreeTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useDepartmentStore } from "@/store/useDepartmentStore"
const { departmentList } = storeToRefs(useDepartmentStore())
const { setDepartmentList, setCurrentDepartmentId } = useDepartmentStore()
const loading = ref(true)
onMounted(() => {
  //模擬取得資料
  setTimeout(() => {
    setDepartmentList([
      //假資料
      {
        key:'01',
        data:{
          id: '001',
          name: '魔法部',
        },
        children: [
          {
            key:"01-1",
            data:{
              id: '001-1',
              name: '魔法執行部門',
            },
            children: [
              {
                key:"01-1-1",
                data:{
                  id: '001-1-1',
                  name: '正氣師局'
                },
              },
              {
                key:"01-1-2",
                data:{
                  id: '001-1-2',
                  name: '麻瓜人工製品濫用局'
                }
              }
            ]
          },
          {
            key:'001-20',
            data:{
              id: '001-2',
              name: '魔法意外和災難部門'
            }
          }
        ]
      },
      {
        key:"02",
        data:{
          id: '002',
          name: '霍格華茲',
        },
        children: [
          {
            key:"02-1",
            data:{
              id: "002-1",
              name: '屎萊哲林'
            }
          },
          {
            key:"02-2",
            data:{
              id: '002-2',
              name: "葛來糞多"
            }
          },
          {
            key:"02-3",
            data:{
              id: '002-3',
              name: '賀夫怕夫'
            }
          },
          {
            key:'02-4',
            data:{
              id: '002-4',
              name: '雷文克勞'
            }
          }
        ]
      }
    ])
    loading.value = false
  }, 500)
})

function viewInfo(id: string) {
  console.log(id)
  setCurrentDepartmentId(id)
  navigateTo(`department_group/${id}`)
}
function editData(id: string) {
  setCurrentDepartmentId(id)
  navigateTo(`department_group/${id}`)
}

function deleteData(id: string) {
  console.log(id)
}


</script>
<style scoped lang="scss">
:deep(.p-datatable-frozen-tbody) {
  font-weight: bold;
}

:deep(.p-datatable-scrollable .p-frozen-column) {
  font-weight: bold;
}
</style>