import { AuthLogin, AuthRegistry, AuthLoginRespon, AuthRegistryRespon } from '@/types/auth';
import { type CredentialResponse } from 'vue3-google-signin';
import useApiBase from './useApiBase';

export default () => {
    const { fetchApiBase } = useApiBase();

    //MyModel API
    async function login(payload: AuthLogin) {
        const res = await fetchApiBase('/login', 'post', payload);
        return res as AuthLoginRespon;
    }
    async function googleLogin(payload: CredentialResponse) {
        const { token }  = await fetchApiBase('/auth/google', 'post', payload);
        return token as string
    }
    async function registry(payload: AuthRegistry) {
        const { user } = await fetchApiBase('/register', 'post', payload);
        return user as AuthRegistryRespon;
    }
    async function getAuth() {
        //取得當前登入的使用者
        return await fetchApiBase('/auth/user', 'get');
    }

    return {
        //data
        //methods
        login,
        registry,
        googleLogin,
        getAuth
    };
};
