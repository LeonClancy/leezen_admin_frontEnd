<script setup>
import { useAuthStore } from '~/store/useAuthStore';
import useAuthAPI from "@/composables/api/useAuthAPI"
import AppMenuItem from './AppMenuItem.vue';
const { authRole } = storeToRefs(useAuthStore())
const { getAuth } = useAuthAPI()
const { setAuthRole } = useAuthStore()

const model = ref([
    {
        label: '',
        items: [
            {
                label: '資料建檔',
                icon: 'pi pi-book',
                items: [
                    {
                        label: '資產設備基本',
                        icon: 'pi pi-circle-fill',
                        to: '/data_page/asset_equipment'
                    },
                    {
                        label: '保管人基本資料',
                        icon: 'pi pi-circle-fill',
                        to: '/data_page/custodian'
                    },
                    {
                        label: '部門群組',
                        icon: 'pi pi-circle-fill',
                        to: '/data_page/department_group'
                    },
                    {
                        label: '資產類型管理',
                        icon: 'pi pi-circle-fill',
                        to: '/data_page/category'
                    },
                    {
                        label: '保管人職位管理',
                        icon: 'pi pi-circle-fill',
                        to: '/data_page/custodian_position',
                    },
                    {
                        label: '保管人狀態管理',
                        icon: 'pi pi-circle-fill',
                        to: '/data_page/custodian_status',
                    }
                ]
            }
        ]
    },
    {
        label: '',
        items: [
            {
                label: '管理權限設定',
                icon: 'pi pi-user-edit',
                to: '/manager_authority_setting'
            }
        ]
    },
]);
onMounted(()=>{
    processSetAuthRole()
})
async function processSetAuthRole() {
    const { role_id } = await getAuth()
    setAuthRole(role_id)
    if (authRole.value === 1) {
        model.value.push({
            label: '',
            items: [
                {
                    label: '管理功能',
                    icon: 'pi pi-star',
                    items: [
                        {
                            label: '會員管理',
                            icon: 'pi pi-users',
                            to: '/manage/member'
                        },
                    ]
                }
            ]
        })
    }
}
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>