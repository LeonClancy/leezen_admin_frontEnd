import { useToast } from 'primevue/usetoast';
export default () => {
  const toast = useToast()
  const { apiBaseUrl } = useRuntimeConfig().public

  async function fetchApiBase(url:string, method:'post' | 'get' | 'delete' | 'patch' | 'put',body?: any): Promise<any> {
    const { data, error } = await useFetch(url, {baseURL:apiBaseUrl, method, body })
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
