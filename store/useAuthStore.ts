import { defineStore } from "pinia";
import { Auth } from "@/types/auth"

// 使用composition API模式定义store
export const useAuthStore = defineStore("authStore", () => {
  // 初始状态
  const initState = {
    authToken:'',
    role_id:0
  };

  //state
  const authToken = ref<string>(initState.authToken);
  const authRole = ref<number>(initState.role_id)

  //actions
  function setAuthToken(payload:string){
    authToken.value = payload
    console.log('pina token', authToken.value)
  }
  function setAuthRole(payload:number){
    authRole.value = payload
  }

  return {
    //data
    authToken,
    authRole,
    //methods
    setAuthToken,
    setAuthRole
  };
});
