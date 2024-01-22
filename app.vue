<template>
    <NuxtLayout>
        <NuxtPage/>
    </NuxtLayout>
  
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/useAuthStore"
useHead({
    title:'里仁Admin'
})
const { setAuth } = useAuthStore()

function authInit(){
    const token = window.localStorage.getItem('token')
    if(token){
        setAuth({
            isLogin:true,
            token
        })
    }
}


</script>