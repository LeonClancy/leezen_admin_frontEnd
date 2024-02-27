export default class AuthService {
    constructor() {
        this.apiBaseUrl = useRuntimeConfig().public.apiBaseUrl
    }

    googleLogin(googleResponse) {
        return fetch(`${this.apiBaseUrl}/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(googleResponse)
        })
    }
}