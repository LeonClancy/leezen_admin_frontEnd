export default class DepartmentService {
    constructor() {
        this.apiBaseUrl = useRuntimeConfig().public.apiBaseUrl
    }

    async getDepartments() {
        const response = await fetch(`${this.apiBaseUrl}/departments`)
        return await response.json()
    }

    async getDepartmentList() {
        const response = await fetch(`${this.apiBaseUrl}/departments/type/list`)
        return await response.json()
    }

    async createDepartment(department) {
        const response = await fetch(`${this.apiBaseUrl}/departments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(department)
        })
        return await response.json()
    }
}