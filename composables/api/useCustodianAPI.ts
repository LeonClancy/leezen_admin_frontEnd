import { type CustodianDeleteRequest, type CustodianUpdateRequest, type Custodian } from "@/types/custodian" 
import useApiBase from "./useApiBase"

export default () => {
  const { fetchApiBase } = useApiBase()

  //MyModel API
  async function getCustodians(){
   const {custodians } = await fetchApiBase(`/custodians`,"get");
    return custodians as unknown as Custodian[]; 
  }
  async function getCustodian(id:string){
   const {custodian } = await fetchApiBase(`/custodians/${id}`,"get");
    return custodian as unknown as Custodian; 
  }
  async function updateCustodian(payload: CustodianUpdateRequest){
    const {custodian } = await fetchApiBase(`/custodians/${payload.id}`,"patch",payload);
    return custodian as unknown as Custodian;
  }
  async function deleteCustodian(payload: CustodianDeleteRequest) {
    const {custodian } = await fetchApiBase(`/custodians/${payload.id}`,"delete");
    return custodian as unknown as Custodian;
  }
 
  return {
    //data
    //methods
    getCustodians,
    getCustodian,
    updateCustodian,
    deleteCustodian
  }
};
