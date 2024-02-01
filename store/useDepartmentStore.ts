import { defineStore } from 'pinia';
import { Department } from '@/types/department';

// 使用composition API模式定义store
export const useDepartmentStore = defineStore('departmentStore', () => {
    // 初始状态
    const initState = {
        departmentList: [],
        currentDepartment: null
    };

    //state
    const departmentList = ref<Department[]>(initState.departmentList);
    const currentDepartment = ref<Department>(initState.currentDepartment);

    //actions
    function setDepartmentList(payload: Department[]) {
        departmentList.value = payload;
    }
    function setCurrentDepartment(payload:Department) {
        currentDepartment.value = payload;
    }

    return {
        //data
        departmentList,
        currentDepartment,
        // department,
        //methods
        setDepartmentList,
        setCurrentDepartment
    };
});
