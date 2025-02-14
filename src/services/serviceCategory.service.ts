import api from "../config/api.client.config";

export interface ServiceCategory {
    id: number;
    name: string;
}

export const getServiceCategories = async (): Promise<ServiceCategory[]> => {
    const response = await api.get<ServiceCategory[]>('/ServiceCategory');
    return response.data;
};

export const getServiceCategoryById = async (id: number | string): Promise<ServiceCategory> => {
    const response = await api.get<ServiceCategory>(`/ServiceCategory/${id}`);
    return response.data;
};