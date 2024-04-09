export default class AcquisitionSourceService {
    constructor() {
        this.apiBaseUrl = useRuntimeConfig().public.apiBaseUrl
    }

    async getAcquisitionSources() {
        return fetch(`${this.apiBaseUrl}/acquisition-sources`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }

    async createAcquisitionSource(acquisitionSource) {
        return fetch(`${this.apiBaseUrl}/acquisition-sources`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(acquisitionSource)
        })
    }

    async updateAcquisitionSource(acquisitionSource) {
        return fetch(`${this.apiBaseUrl}/acquisition-sources/${acquisitionSource.id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(acquisitionSource)
        })
    }
}