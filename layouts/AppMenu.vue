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
                    }
                ]
            }
        ]
    },
    {
        label: '',
        items: [
            {
                label: '一般查詢',
                icon: 'pi pi-search',
                items: [
                    {
                        label: '保管人進階資料',
                        icon: 'pi pi-circle-fill',
                        to: '/search_base/custodian'
                    },
                    {
                        label: '資產設備進階資料',
                        icon: 'pi pi-circle-fill',
                        to: '/search_base/asset_equipment'
                    },
                ]
            }
        ]
    },
    {
        label: '',
        items: [
            {
                label: '各式報表查詢',
                icon: 'pi pi-chart-bar',
                items: [
                    {
                        label: '資產設備',
                        icon: 'pi pi-circle-fill',
                        to: '/search_report/asset_equipment'
                    },
                ]
            }
        ]
    },
    {
        label: '',
        items: [
            {
                label: '標籤列印',
                icon: 'pi pi-print',
                items: [
                    {
                        label: '資產設備一般標籤列印A4雷射/噴墨(3x7)',
                        icon: 'pi pi-circle-fill',
                        to: '/print_label/asset_equipment_print_type1'
                    },
                ]
            }
        ]
    },
    {
        label: '',
        items: [
            {
                label: '盤點功能',
                icon: 'pi pi-check-square',
                items: [
                    {
                        label: '連續單筆資產及時盤點',
                        icon: 'pi pi-circle-fill',
                        to: '/check/asset_continuous_single_check'
                    },
                ]
            }
        ]
    },
    {
        label: '',
        items: [
            {
                label: '系統維護功能',
                icon: 'pi pi-cog',
                items: [
                    {
                        label: '設定登錄者密碼與權限',
                        icon: 'pi pi-circle-fill',
                        to: '/maintain_system/login_password_authority'
                    },
                ]
            }
        ]
    },
    {
        label: '',
        items: [
            {
                label: '關於本軟體與更新',
                icon: 'pi pi-exclamation-circle',
                to: '/about'
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