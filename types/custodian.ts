export declare interface Custodian {
    id: string | number;
    code: string;
    id_number: string;
    name: string;
    email: string;
    contact_number: string;
    mobile_number: string;
    birthday: string;
    remarks: string | null;
    address: string;
    created_at: string;
    updated_at: string;
    department_id: string | number;
}
export declare interface CustodianUpdateRequest {
    id: string | number;
    code: string;
    id_number: string;
    name: string;
    email: string;
    contact_number: string;
    mobile_number: string;
    birthday: string;
    remarks: string | null;
    address: string;
}
export declare interface CustodianDeleteRequest {
    id: string | number;
}
export enum Position {
    '部長',
    '科長',
    '課長'
}
