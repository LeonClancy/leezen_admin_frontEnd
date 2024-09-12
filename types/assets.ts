export declare interface Asset {
    code: string;
    id: string;
    name: string;
    type: string;
    product_code: string;
    acquire_date: string;
    acquisition_cost: number;
}
export declare interface CreateAssetRequest {
    acquisition_cost: number;
    acquisition_date: string;
    acquisition_source_id: number;
    // asset_number: string;
    brand_model: string;
    category_id: number;
    contact_person: string;
    custodian_id: number;
    department_id: number;
    name: string;
    product_serial_number: string;
    service_contact_phone: string;
    service_vendor: string;
    specifications_detail: string;
    useful_life_years: number;
    warranty_period: string;
    memo: string;
    unit: string;
    location: string;
    uniform_number: string;
}
export declare interface UpdateAssetRequest {
    acquisition_cost: number;
    acquisition_date: string;
    acquisition_source: string;
    // asset_number: string;
    brand_model: string;
    category_id: number;
    contact_person: string;
    current_value: number;
    custodian_id: number;
    department_id: number;
    name: string;
    product_serial_number: string;
    service_contact_phone: string;
    service_vendor: string;
    specifications_detail: string;
    useful_life_years: number;
    warranty_period: string;
    uniform_number: string;
}
