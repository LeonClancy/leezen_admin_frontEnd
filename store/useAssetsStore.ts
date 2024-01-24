import { defineStore } from "pinia";
import { Asset } from "@/types/assets"

// 使用composition API模式定义store
export const useAssetsStore = defineStore("assetsStore", () => {
  // 初始状态
  const initState = {
    assetsList:[],
    currentAssetId:"001",
  };

  //state
  const assetsList = ref<Asset[]>(initState.assetsList);
  const currentAssetId = ref<string>(initState.currentAssetId)

  //gatters
  const asset = computed(()=> assetsList.value.find(asset => asset.id === currentAssetId.value))

  //actions
  function setAssetsList(payload:Asset[]){
    assetsList.value = payload
  }
  function setCurrentAssetId(payload:string){
    currentAssetId.value = payload
  }

  return {
    //data
    assetsList,
    asset,
    //methods
    setAssetsList,
    setCurrentAssetId
  };
});
