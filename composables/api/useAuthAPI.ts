import { AuthLogin, AuthRegistry, AuthLoginRespon, AuthRegistryRespon } from '@/types/auth';
import useApiBase from './useApiBase';

export default () => {
    const { fetchApiBase } = useApiBase();

    //MyModel API
    async function login(payload: AuthLogin) {
        const { token } = await fetchApiBase('/login', 'post', payload);
        return { token } as AuthLoginRespon;
    }
    async function registry(payload: AuthRegistry) {
        const { user } = await fetchApiBase('/register', 'post', payload);
        return user as AuthRegistryRespon;
    }
    
    return {
        //data
        //methods
        login,
        registry,
    };
};
