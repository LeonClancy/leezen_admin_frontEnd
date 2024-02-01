export default () => {
  const { apiBaseUrl } = useRuntimeConfig().public

  async function fetchApiBase(url:string, method:'post' | 'get' | 'delete' | 'patch',body?: any): Promise<any> {
    const { data, error } = await useFetch(url, {
      baseURL:apiBaseUrl,
      method,
      body
    });
    if (error.value) throw createError({ ...error.value, message: "資料異常" });
    return data.value as unknown as any;
  }
 
  return {
    //data
    //methods
    fetchApiBase
  };
};