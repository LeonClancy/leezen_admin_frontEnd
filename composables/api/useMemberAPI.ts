import { type SearchMemberRequest, type MemberDeleteRequest, type MemberCreateRequest, type MemberUpdateRequest,type Member } from "@/types/member" 
import useApiBase from "./useApiBase"

export default () => {
  const { fetchApiBase } = useApiBase()

  //MyModel API
  async function getMembers(){
   const { users } = await fetchApiBase(`/users`,"get");
    return users as Member[]; 
  }
  async function getMember(id:string | number){
   const { user } = await fetchApiBase(`/users/${id}`,"get");
    return user as Member; 
  }
  async function createMember(payload:MemberCreateRequest){
   const { user } = await fetchApiBase(`/users`,"post",payload);
    return user as Member; 
  }
   async function updateMember(payload:MemberUpdateRequest){
   const { user } = await fetchApiBase(`/users/${payload.id}`,"put",payload);
    return user as Member; 
  }
  async function deleteMember(payload: MemberDeleteRequest){
    const { user } = await fetchApiBase(`/users/${payload.id}`,"delete");
    return user as Member;
  }
  async function searchMembers(payload: SearchMemberRequest){
    let data;
    if(payload) {
      if(payload.created_at_end || payload.created_at_start) data = await fetchApiBase(`/users/?name=${payload.name}&email=${payload.email}&custodian_name=${payload.custodian_name}&create_at_start=${payload.created_at_start}&created_at_end=${payload.created_at_end}`,"get");
      else data = await fetchApiBase(`/users/?name=${payload.name}&email=${payload.email}&custodian_name=${payload.custodian_name}`,"get");
    }
    else data = await fetchApiBase('/users','get')  
    return data.users as Member[];
  }
 
  return {
    //data
    //methods
    getMembers,
    getMember,
    createMember,
    updateMember,
    deleteMember,
    searchMembers
  }
};
