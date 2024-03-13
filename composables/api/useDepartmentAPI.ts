import { 
  type DepartmentDeleteRequest, 
  type DepartmentCreateRequest, 
  type DepartmentUpdateRequest,
  type DepartmentsOption,
  type Department 
} from "@/types/department" 
import useApiBase from "./useApiBase"

export default () => {
  const { fetchApiBase } = useApiBase()

  //MyModel API
  async function getDepartments(){
   const {departments } = await fetchApiBase(`/departments`,"get");
    return departments as unknown as Department[]; 
  }
  async function getDepartment(id:string | number){
   const {department } = await fetchApiBase(`/departments/${id}`,"get");
    return department as Department; 
  }
  async function createDepartment(payload:DepartmentCreateRequest){
   const {department } = await fetchApiBase(`/departments`,"post",payload);
    return department as Department; 
  }
   async function updateDepartment(payload:DepartmentUpdateRequest){
   const {department } = await fetchApiBase(`/departments/${payload.id}`,"put",payload);
    return department as Department; 
  }
  async function deleteDepartment(payload: DepartmentDeleteRequest){
    const {department } = await fetchApiBase(`/departments/${payload.id}`,"delete");
    return department as Department;
  }
  async function getDepartmentsOptions(){
    const options = await fetchApiBase(`/departments/type/options`, 'get')
    return options as DepartmentsOption[]
  }
 
  return {
    //data
    //methods
    getDepartments,
    getDepartment,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentsOptions
  }
};
