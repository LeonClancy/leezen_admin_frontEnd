export declare interface Member {
    id: number;
    name: string;
    email: string;
    custodian_id: number;
    role_id: number;
    // created_at?:string
    // updated_at?:string
    // email_verified_at?:string
}
export interface MemberDeleteRequest {
    id: string;
}
export interface MemberCreateRequest {
    name: string;
    email: string;
    custodian_id: number;
}
export interface MemberUpdateRequest {
    id: number;
    name: string;
    email: string;
    custodian_id: number;
    role_id: number;
}

export interface SearchMemberRequest{
   name?:string,  //帳號名稱
   email?:string,
   created_at_start?:string, //建立時間
   created_at_end?:string  //結束時間
   custodian_id?:number
}
