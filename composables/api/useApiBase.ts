import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '~/store/useAuthStore';
export default () => {
  const toast = useToast()
  const { apiBaseUrl:baseURL } = useRuntimeConfig().public
  const { authToken } = storeToRefs(useAuthStore())

  async function fetchApiBase(url:string, method:'post' | 'get' | 'delete' | 'patch' | 'put',body?: any): Promise<any> {
    const { data, error } = await useFetch(url, {
      headers:{
        'Authorization':`Bearer ${authToken.value}`
      },
      baseURL,
      method, 
      body,
    })
    if (error.value) {
      toast.add({ severity: "error", summary: "請求發生錯誤", detail: `錯誤明細 : ${error.value}`, life: 5000 })
      throw createError({ ...error.value, message: "資料異常" });
    }
    return data.value as unknown as any;
  }
 
  return {
    //data
    //methods
    fetchApiBase
  };
};
