<script setup lang="ts">
import { AuthLogin } from "@/types/auth"
import AppConfig from '@/layouts/AppConfig.vue';
import { useAuthStore } from "@/store/useAuthStore"
import useAuthAPI from "@/composables/api/useAuthAPI"
const { setAuth } = useAuthStore()
const { login } = useAuthAPI()
const authLogin = ref<AuthLogin>({
    email:"",
    password:""
})
const checked = ref(false);

definePageMeta({
    layout: false
});

async function fetchLogin(){
    try{
        const { token } = await login(authLogin.value)
        if(token){
            window.localStorage.setItem('token',token)
            setAuth({
                isLogin:true,
                token
            })
        }
        console.log(token)
    }catch(err){
        alert(err)
    }
}
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img src="~/assets/images/login_logo.jpg" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="flex justify-content-center">
                        <p class="text-3xl text-900">使用者登入</p>
                    </div>
                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" v-model="authLogin.email" type="text" placeholder="Email address" class="w-full md:w-30rem mb-5" style="padding: 1rem" />

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="authLogin.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>

                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <Checkbox id="rememberme1" v-model="checked" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                         <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <div class="flex align-items-center">
                                <label for="rememberme1">還沒有帳號?</label>
                            </div>
                            <NuxtLink to="/auth/SignUp"> 去註冊 </NuxtLink>
                        </div>
                        <Button label="登入" class="w-full p-3 text-xl" @click="fetchLogin"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <AppConfig simple />
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
