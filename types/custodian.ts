export declare interface Custodian{
    id:string,
    code:string,
    id_number:string,
    name:string,
    email:string,
    contact_number:string,
    mobile_number:string,
    birthday:string,
    remarks:string | null,
    created_at:string,
    updated_at:string
}
export declare interface CustodianDeleteRequest{
    id:string
}
export enum Position{
    '部長',
    '科長',
    '課長'
}
