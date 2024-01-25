export declare interface DepartmentNode{
    key:string,
    data:DepartmentData
    children?:DepartmentNode[]
}
interface DepartmentData{
    id:string,
    name:string,
}

export enum DepartmentEnum{  //作假select暫時使用，之後可以後端取值渲染
    '康樂部',
    '司法部',
    '風紀部',
}