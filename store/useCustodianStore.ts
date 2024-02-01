import { defineStore } from "pinia";
import { Custodian } from "@/types/custodian"

// 使用composition API模式定义store
export const useCustodianStore = defineStore("custodianStore", () => {
  // 初始状态
  const initState = {
    cutodianList:[],
    currentCustodianId:"001",
  };

  //state
  const custodianList = ref<Custodian[]>(initState.cutodianList);
  const currentCustianId = ref<string>(initState.currentCustodianId)

  //gatters
  const custodian = computed(()=> custodianList.value.find(custodiant => custodiant.id === currentCustianId.value))

  //actions
  function setCustodianList(payload:Custodian[]){
    custodianList.value = payload
  }
  function setCurrentCustodianId(payload:string){
    currentCustianId.value = payload
  }

  return {
    //data
    custodianList,
    custodian,
    currentCustianId,
    //methods
    setCustodianList,
    setCurrentCustodianId
  };
});
