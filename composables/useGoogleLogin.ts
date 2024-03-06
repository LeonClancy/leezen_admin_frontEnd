import { type CredentialResponse } from 'vue3-google-signin';
import AuthService from '~/service/AuthService';
export default function useGoogleLogin() {

    async function handleOnGoogleSignInSuccess(response: CredentialResponse) {
        let service = new AuthService();
        service.googleLogin(response).then((res) => {
            return res.json();
        }).then((res) => {
            console.log('Login success', res);
            window.localStorage.setItem('token', res.token);
            navigateTo('/');
        })
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
