import { defineStore } from "pinia";
import { Member } from "@/types/member"

// 使用composition API模式定义store
export const useMembersStore = defineStore("membersStore", () => {
  // 初始状态
  const initState = {
    membersList:[],
    currentMemberId:"001",
  };

  //state
  const membersList = ref<Member[]>(initState.membersList);
  const currentMemberId = ref<string>(initState.currentMemberId)

  //gatters
  const member = computed(()=> membersList.value.find(member => member.id === currentMemberId.value))

  //actions
  function setMembersList(payload:Member[]){
    membersList.value = payload
  }
  function setCurrentMemberId(payload:string){
    currentMemberId.value = payload
  }

  return {
    //data
    membersList,
    member,
    //methods
    setMembersList,
    setCurrentMemberId
  };
});
