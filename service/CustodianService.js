export class CustodianService {
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
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(custodian)
        })
        return await response.json()
    }
}