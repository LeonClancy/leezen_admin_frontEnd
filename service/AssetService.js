export default class AssetService {
    constructor() {
        this.apiBaseUrl = useRuntimeConfig().public.apiBaseUrl
    }

    async getAssets() {
        const response = await fetch(`${this.apiBaseUrl}/assets`)
        return await response.json()
    }

    async createAsset(asset) {
        const response = await fetch(`${this.apiBaseUrl}/assets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(asset)
        })
        return await response.json()
    }

    async getAsset(assetId) {
        const response = await fetch(`${this.apiBaseUrl}/assets/${assetId}`, {
            method: 'GET',
            headers: {
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
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(asset)
        })
        return await response.json()
    }

    async deleteAsset(assetId) {
        const response = await fetch(`${this.apiBaseUrl}/assets/${assetId}`, {
            method: 'DELETE'
        })
        return await response.json()
    }
}