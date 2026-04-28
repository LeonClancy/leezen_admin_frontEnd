export default class AssetStatusService {
    constructor() {
        this.apiBaseUrl = useRuntimeConfig().public.apiBaseUrl
    }

    async getAssetStatuses() {
        return fetch(`${this.apiBaseUrl}/asset-statuses`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }

    async createAssetStatus(assetStatus) {
        return fetch(`${this.apiBaseUrl}/asset-statuses`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assetStatus)
        })
    }

    async updateAssetStatus(assetStatus) {
        return fetch(`${this.apiBaseUrl}/asset-statuses/${assetStatus.id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assetStatus)
        })
    }
}
