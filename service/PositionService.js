export default class PositionService {
    constructor() {
        this.apiBaseUrl = useRuntimeConfig().public.apiBaseUrl
    }

    async getPositions() {
        return fetch(`${this.apiBaseUrl}/positions`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }

    async createPosition(position) {
        return fetch(`${this.apiBaseUrl}/positions`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(position)
        })
    }

    async updatePosition(position) {
        return fetch(`${this.apiBaseUrl}/positions/${position.id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(position)
        })
    }
}