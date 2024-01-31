export declare interface DepartmentNode{ //前端做tree table的資料, 主要是多了一個key、data欄位
    key:string,
    data:DepartmentNodeData
}
export declare interface Department extends DepartmentNode{ //後端傳來的Department回應資料
    id:number,
    code:string,
    name:string,
    created_at:string,
    updated_at:string,
    _lft:number,
    _rgt:number,
    parent_id:number | null,
    depth:number,
    children?:Department[]
}
export declare interface DepartmentNodeData{
    id:string | number,
    name:string,
    code:string,
    depth:number
}
export declare interface DepartmentDeleteRequest{
    id:string
}
export declare interface DepartmentCreateRequest{
    name:string,
    code:string,
    parent_id:number | null
}