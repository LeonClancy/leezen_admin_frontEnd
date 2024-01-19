<script setup lang="ts">
// import AppConfig from '@/layouts/AppConfig.vue';
const { layoutConfig } = useLayout();

import { AuthRegistry } from "@/types/auth"
const authRegistry = ref<AuthRegistry>({
    name:'',
    email:'',
    password:''
})

definePageMeta({
    layout: false
});

async function fetchRegistry(){
    
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img src="~/assets/images/login_logo.jpg" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="flex justify-content-center">
                        <p class="text-3xl text-900">使用者註冊</p>
                    </div>
                    <div>
                        <label for="authName" class="block text-900 text-xl font-medium mb-2">Name</label>
                        <InputText id="authName" v-model="authRegistry.name" type="text" placeholder="Auth name" class="w-full md:w-30rem mb-5" style="padding: 1rem" />
                        
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" v-model="authRegistry.email" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="authRegistry.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <label for="rememberme1">已經有帳號了?</label>
                            </div>
                            <NuxtLink to="/auth/Login">去登入</NuxtLink>
                        </div>
                        <Button label="註冊" class="w-full p-3 text-xl" @click="fetchRegistry"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- <AppConfig simple /> -->
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}
.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
