import api from '../config/api.client.config';

export interface Customer {
    id: number;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

export const getCustomers = async (): Promise<Customer[]> => {
  const response = await api.get<Customer[]>('/Customer');
  return response.data;
};

export const getCustomerById = async (id: number | string): Promise<Customer> => {
  const response = await api.get<Customer>(`/Customer/${id}`);
  return response.data;
};
