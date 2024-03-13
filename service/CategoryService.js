export default class CategoryService {
    constructor() {
        this.apiBaseUrl = useRuntimeConfig().public.apiBaseUrl
    }

    getCategories() {
        return fetch(`${this.apiBaseUrl}/categories`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }

    createCategory(category) {
        return fetch(`${this.apiBaseUrl}/categories`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category)
        })
    }

    editCategory(id, category) {
        return fetch(`${this.apiBaseUrl}/categories/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(category),
        })
    }

    getCategoryOptions() {
        return fetch(`${this.apiBaseUrl}/categories/options`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
    }
}