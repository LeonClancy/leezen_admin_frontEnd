export default class RoleService {
    constructor() {
        this.apiBaseUrl = useRuntimeConfig().public.apiBaseUrl
    }

    getRoles() {
        return fetch(`${this.apiBaseUrl}/roles`)
            .then(response => response.json())
    }
}