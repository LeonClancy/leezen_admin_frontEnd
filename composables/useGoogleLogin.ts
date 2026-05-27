import { type CredentialResponse } from 'vue3-google-signin';
import useAuthAPI from './api/useAuthAPI';
import { useAuthStore } from '~/store/useAuthStore';
export default function useGoogleLogin() {
    const { googleLogin } = useAuthAPI();
    const { setAuthToken } = useAuthStore();
    async function handleOnGoogleSignInSuccess(response: CredentialResponse) {
        if (!response.credential) {
            return console.error('Google credential is missing');
        }

        const token = await googleLogin(response.credential);
        if (!token) return console.log('登入驗證失敗', token);
        window.localStorage.setItem('token', token);
        setAuthToken(token);
        navigateTo('/');
    }

    function handleOnGoogleSignInError() {
        console.error('Login failed');
    }
    return {
        //data
        // methods
        handleOnGoogleSignInSuccess,
        handleOnGoogleSignInError
    };
}
