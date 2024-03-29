export default class StatusService {
    constructor() {
        this.apiBaseUrl = useRuntimeConfig().public.apiBaseUrl
    }

    async getStatus() {
        return fetch(`${this.apiBaseUrl}/status`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }

    async createStatus(status) {
        return fetch(`${this.apiBaseUrl}/status`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(status)
        })
    }

    async updateStatus(status) {
        return fetch(`${this.apiBaseUrl}/status/${status.id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(status)
        })
    }
}