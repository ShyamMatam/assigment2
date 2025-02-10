const API_URL = 'http://localhost:5000/api';

export const propertyApi = {
    getAll: async () => {
        const response = await fetch(`${API_URL}/properties`);
        return response.json();
    },

    create: async (property: Omit<Property, 'id'>) => {
        const response = await fetch(`${API_URL}/properties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(property),
        });
        return response.json();
    },

    update: async (id: string, property: Partial<Property>) => {
        const response = await fetch(`${API_URL}/properties/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(property),
        });
        return response.json();
    },

    delete: async (id: string) => {
        const response = await fetch(`${API_URL}/properties/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    },
};