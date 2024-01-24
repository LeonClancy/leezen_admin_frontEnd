import { useAuthStore } from '../store/useAuthStore';
export default defineNuxtRouteMiddleware((to, from) => {
    const { auth } = storeToRefs(useAuthStore());
    // only skip middleware on initial client load
    const nuxtApp = useNuxtApp();
    if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
        const token = window.localStorage.getItem('token')
        if(token){
            const { setAuth } = useAuthStore()
            setAuth({
                token
            })
        }
    }
    if (process.client) {
        if (!to.path.includes('login') && !to.path.includes('SignUp')) {
            if (!auth.value.token) {
                // alert('使用者需要先登入');
                return navigateTo('/auth/login'); //一定要return 掉，否則navigate完後，又會跑去該路由XD
            }
        }
    };
    
});
