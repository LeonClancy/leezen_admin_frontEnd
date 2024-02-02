export default class CustodianService {
    constructor() {
        this.apiBaseUrl = useRuntimeConfig().public.apiBaseUrl
    }

    async getCustodians() {
        const response = await fetch(`${this.apiBaseUrl}/custodians`)
        return await response.json()
    }

    async createCustodian(custodian) {
        const response = await fetch(`${this.apiBaseUrl}/custodians`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(custodian)
        })
        return await response.json()
    }

    async getCustodianOptions() {
        const response = await fetch(`${this.apiBaseUrl}/custodians/type/options`)
        return await response.json()
    }
}