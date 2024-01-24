import { AuthLogin, AuthRegistry, AuthLoginRespon, AuthRegistryRespon } from "@/types/auth" 
import useApiBase from "./useApiBase"

export default () => {
  const { fetchApiBase } = useApiBase()

  //MyModel API
  async function login(payload: AuthLogin): Promise<AuthLoginRespon> {
    const { token, errors } = await fetchApiBase("/login", "post",payload,);
    if (errors) throw createError({ ...errors, message: "登入失敗" });
    return {token} as unknown as AuthLoginRespon;
  }
  async function registry(payload: AuthRegistry): Promise<AuthRegistryRespon> {
    const { user, errors } = await fetchApiBase("/register","post",payload);
    if (errors) throw createError({...errors,message: "資料異常" });
    return user as unknown as AuthRegistryRespon;
  }
 
  return {
    //data
    //methods
    login,
    registry
  };
};
