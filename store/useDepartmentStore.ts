import { defineStore } from "pinia";
import { DepartmentNode } from "@/types/department"

// 使用composition API模式定义store
export const useDepartmentStore = defineStore("departmentStore", () => {
  // 初始状态
  const initState = {
    departmentList:[],
    currentDepartmentId:"001",
  };

  //state
  const departmentList = ref<DepartmentNode[]>(initState.departmentList);
  const currentDepartmentId = ref<string>(initState.currentDepartmentId)

  //gatters
  const department = computed(()=> departmentList.value.find(department => department.data.id === currentDepartmentId.value))

  //actions
  function setDepartmentList(payload:DepartmentNode[]){
    departmentList.value = payload
  }
  function setCurrentDepartmentId(payload:string){
    currentDepartmentId.value = payload
  }

  return {
    //data
    departmentList,
    department,
    //methods
    setDepartmentList,
    setCurrentDepartmentId
  };
});
