import { defineStore } from "pinia";
import { Auth } from "@/types/auth"

// 使用composition API模式定义store
export const useAuthStore = defineStore("authStore", () => {
  // 初始状态
  const initState = {
    auth:{
      isLogin:false,
      token:''
    },
  };

  //state
  const auth = ref<Auth>(initState.auth);

  //gatters
  // const unStockInModels = computed(()=> auth.value.filter(model => model.status === ModelStatus.未入庫))

  //actions
  function setAuth(payload:Auth){
    auth.value = payload
  }

  return {
    //data
    auth,
    //methods
    setAuth,
  };
});
