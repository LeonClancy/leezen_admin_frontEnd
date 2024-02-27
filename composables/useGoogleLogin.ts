import { type CredentialResponse, decodeCredential } from 'vue3-google-signin';
import AuthService from '~/service/AuthService';
export default function useGoogleLogin() {

    async function handleOnGoogleSignInSuccess(response: CredentialResponse) {
        let service = new AuthService();
        service.googleLogin(response).then((res) => {
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
