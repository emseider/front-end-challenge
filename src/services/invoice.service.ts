import api from "../config/api.client.config";
import { Invoice, InvoiceDetail, InvoiceResponse, type Filter } from "../types";

export interface UpdateInvoice {
    customerFromId: string;
    customerToId: string;
    customerToFullName: string;
    shipping: number;
    discount: number;
    taxes: number;
    status: string;
    details: InvoiceDetail[];
    dueDateTime: string;
}

export interface SearchInvoicesParams {
    filter?: string;
    select?: string;
    expand?: string;
    top?: number;
    skip?: number;
    orderBy?: string;
}

export const getInvoiceStatus = async (): Promise<string[]> => {
    const response = await api.get<string[]>('/Invoice/Status');
    return response.data;
};


export const getInvoiceById = async (id: number | string): Promise<Invoice> => {
    const response = await api.get<Invoice>(`/Invoice/${id}`);
    return response.data;
};


export const searchInvoices = async (params?: SearchInvoicesParams): Promise<InvoiceResponse> => {
    const response = await api.get<InvoiceResponse>('/Invoice/search', {
        params: {
            $filter: params?.filter,
            $select: params?.select,
            $expand: params?.expand,
            $top: params?.top,
            $skip: params?.skip,
            $orderBy: params?.orderBy
        },
    });
    return response.data;
};

export const createInvoice = async (invoiceData: UpdateInvoice): Promise<Invoice> => {
    const response = await api.post<Invoice>('/Invoice', invoiceData);
    return response.data;
};


export const updateInvoice = async (id: number | string, invoiceData: UpdateInvoice): Promise<Invoice> => {
    const response = await api.put<Invoice>(`/Invoice/${id}`, invoiceData);
    return response.data;
};

export const deleteInvoice = async (id: number | string): Promise<void> => {
    await api.delete(`/Invoice/${id}`);
};

export const buildFilterQuery = (filters: Partial<Filter>): string => {
    const localSearchTerm = filters.searchTerm || "";
    const queryParts: string[] = [];

    if (localSearchTerm) {
        queryParts.push(`contains(customerToFullName, '${localSearchTerm}')`);
    }
    if (filters.status) {
        queryParts.push(`status eq '${filters.status}'`);
    }
    /**
       * El siguiente código tiene mal funcionamiento debido a que los filtros `creationTime` y `dueDateTime` están generando errores 500.
       * error 500: Unrecognized 'Edm.String' literal 'DateTime'2025-02-14T06:00:00.000Z'' at '38'
       * in 'status eq 'Draft' and creationTime ge DateTime'2025-02-14T06:00:00.000Z''
       *
       * const creationTime = filters.startDate.toISOString();
       * const dueDateTime = filters.endDate.toISOString();
       * const filter = `status eq '${filters.status}' and creationTime ge '${creationTime}' and creationTime le '${dueDateTime}'`;
       */
    /* if (filters.startDate && filters.endDate) {
        const creationTime = filters.startDate.toISOString();
        const dueDateTime = filters.endDate.toISOString();
        query = `${query} and creationTime ge '${creationTime}' and creationTime le '${dueDateTime}'`;
    } */
    return queryParts.join(' and ');
};
