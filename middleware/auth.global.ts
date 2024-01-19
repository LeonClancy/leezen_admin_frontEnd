import { useAuthStore } from '../store/useAuthStore';
export default defineNuxtRouteMiddleware((to, from) => {
    const { auth } = storeToRefs(useAuthStore());
    if (!to.path.includes('login') && !to.path.includes('SignUp')) {
        if (!auth.value.isLogin) {
            // alert('使用者需要先登入');
            return navigateTo('/auth/login'); //一定要return 掉，否則navigate完後，又會跑去該路由XD
        }
    }
});
