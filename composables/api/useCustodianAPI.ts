import { type CustodianDeleteRequest, type Custodian } from "@/types/custodian" 
import useApiBase from "./useApiBase"

export default () => {
  const { fetchApiBase } = useApiBase()

  //MyModel API
  async function getCustodians(){
   const {custodians ,errors } = await fetchApiBase(`/custodians`,"get");
    if (errors) throw createError({ ...errors, message: "登入失敗" });
    return custodians as unknown as Custodian[]; 
  }
  async function deleteCustodian(payload: CustodianDeleteRequest): Promise<Custodian> {
    const {custodian ,errors } = await fetchApiBase(`/custodians/${payload.id}`,"delete");
    if (errors) throw createError({ ...errors, message: "登入失敗" });
    return custodian as unknown as Custodian;
  }
 
  return {
    //data
    //methods
    getCustodians,
    deleteCustodian
  }
};
