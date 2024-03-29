import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '~/store/useAuthStore';
export default () => {
    const toast = useToast();
    const { apiBaseUrl: baseURL } = useRuntimeConfig().public;
    const { authToken } = storeToRefs(useAuthStore());

    async function fetchApiBase(url: string, method: 'post' | 'get' | 'delete' | 'patch' | 'put', body?: any): Promise<any> {
        console.log(method, url, body);
        
        const { data, error } = await useFetch(url, {
            headers: {
                Authorization: `Bearer ${authToken.value}`
            },
            baseURL,
            method,
            body: JSON.stringify(body),
        });
        if (error.value) {
            toast.add({ severity: 'error', summary: '請求發生錯誤', detail: `錯誤明細 : ${error.value.message}`, life: 5000 });
            toast.add({ severity: 'error', summary: '請求發生錯誤', detail: `錯誤明細 : ${error.value.response._data.message}`, life: 5000 });
            throw createError({ ...error.value, message: error.value.response._data.message });
        }
        return data.value
    }

    return {
        //data
        //methods
        fetchApiBase
    };
};
