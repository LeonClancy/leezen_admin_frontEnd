export default class AssetService {
    constructor() {
        this.apiBaseUrl = useRuntimeConfig().public.apiBaseUrl
    }

    async getAssets() {
        const response = await fetch(`${this.apiBaseUrl}/assets`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        return await response.json()
    }

    async createAsset(asset) {
        return await fetch(`${this.apiBaseUrl}/assets`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(asset)
        })
    }

    async getAsset(assetId) {
        const response = await fetch(`${this.apiBaseUrl}/assets/${assetId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        return await response.json()
    }

    async updateAsset(id, asset) {
        const response = await fetch(`${this.apiBaseUrl}/assets/${asset.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(asset)
        })
        return await response.json()
    }

    async deleteAsset(assetId) {
        const response = await fetch(`${this.apiBaseUrl}/assets/${assetId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        return await response.json()
    }

    async exportAssets() {
        return fetch(`${this.apiBaseUrl}/assets/export/excel`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }
}