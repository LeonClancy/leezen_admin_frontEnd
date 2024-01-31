import { type DepartmentDeleteRequest, type DepartmentCreateRequest, type Department } from "@/types/department" 
import useApiBase from "./useApiBase"

export default () => {
  const { fetchApiBase } = useApiBase()

  //MyModel API
  async function getDepartments(){
   const {departments ,errors } = await fetchApiBase(`/departments`,"get");
    if (errors) throw createError({ ...errors, message: "登入失敗" });
    return departments as unknown as Department[]; 
  }
  async function createDepartment(payload:DepartmentCreateRequest){
   const {department ,errors } = await fetchApiBase(`/departments`,"post",payload);
    if (errors) throw createError({ ...errors, message: "登入失敗" });
    return department as unknown as Department; 
  }
  async function deleteDepartment(payload: DepartmentDeleteRequest){
    const {department ,errors } = await fetchApiBase(`/departments/${payload.id}`,"delete");
    if (errors) throw createError({ ...errors, message: "登入失敗" });
    return department as unknown as Department;
  }
 
  return {
    //data
    //methods
    getDepartments,
    createDepartment,
    deleteDepartment
  }
};
