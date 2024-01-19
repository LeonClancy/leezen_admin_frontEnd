export declare interface Auth {
    isLogin:boolean,
    token:string | undefined
}
export interface AuthRegistry{
    name:string,
    email:string,
    password:string
}