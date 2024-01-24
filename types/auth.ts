export declare interface Auth {
    token:string | undefined
}
export interface AuthLogin{
    email:string,
    password:string
}
export interface AuthLoginRespon{
    token:string
}
export interface AuthRegistry{
    name:string,
    email:string,
    password:string,
    password_confirmation:string
}
export interface AuthRegistryRespon{
    name:string,
    email:string,
    updated_at:string,
    created_at:string,
    id:string
}