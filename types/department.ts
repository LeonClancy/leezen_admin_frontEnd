export declare interface DepartmentNode{
    key:string,
    data:DepartmentData
    children?:DepartmentNode[]
}
export declare interface DepartmentData{
    name:string,
    code:string,
    parentDepartment:DepartmentData | null
}