import { Dayjs } from "dayjs";

export enum StatusEnum {
    Paid = "Paid",
    Pending = "Pending",
    Overdue = "Overdue",
    Draft = "Draft",
}

export interface Filter {
    status: string;
    searchTerm: string;
    startDate: Dayjs;
    endDate: Dayjs;
}

export interface InvoiceDetail {
    title: string;
    description: string;
    categoryId: string;
    quantity: number;
    price: number;
    creationTime: string;
    lastModificationTime: string;
}

export interface InvoiceResponse {
    page: number;
    result: Invoice[];
    totalRows: number;
    rowsPerPage: number;
}

export interface Invoice {
    id: number;
    no: string;
    customerFromId: number;
    customerToId: number;
    customerToFullName: string;
    shipping: number;
    discount: number;
    taxes: number;
    status: string;
    details: InvoiceDetail[];
    creationTime: string;
    dueDateTime: string;
    lastModificationTime: string;
    amount: number;
}