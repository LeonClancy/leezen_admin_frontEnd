export declare interface Auth {
    isLogin:boolean,
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