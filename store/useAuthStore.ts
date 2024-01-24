import { defineStore } from "pinia";
import { Auth } from "@/types/auth"

// 使用composition API模式定义store
export const useAuthStore = defineStore("authStore", () => {
  // 初始状态
  const initState = {
    auth:{
      token:''
    },
  };

  //state
  const auth = ref<Auth>(initState.auth);

  //actions
  function setAuth(payload:Auth){
    auth.value = payload
    console.log('設置token')
  }

  return {
    //data
    auth,
    //methods
    setAuth,
  };
});
