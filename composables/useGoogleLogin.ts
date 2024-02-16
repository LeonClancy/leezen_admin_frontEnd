import { type CredentialResponse, decodeCredential } from 'vue3-google-signin';
export default function useGoogleLogin() {

    async function handleOnGoogleSignInSuccess(response: CredentialResponse) {
        const { credential } = response;
        const user = decodeCredential(credential)
        console.log(user)
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
