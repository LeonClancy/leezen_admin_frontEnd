import { AuthLogin, AuthRegistry, AuthLoginRespon } from "@/types/auth" 
import useApiBase from "./useApiBase"

export default () => {
  const { fetchApiBase } = useApiBase()

  //MyModel API
  async function login(payload: AuthLogin): Promise<AuthLoginRespon> {
    const { data, error } = await fetchApiBase("/login", "post",payload,);
    if (error.value) throw createError({ ...error.value, message: "資料異常" });
    return data as unknown as AuthLoginRespon;
  }
  async function registry(payload: AuthRegistry): Promise<AuthRegistry> {
    const { data, error } = await fetchApiBase("/register","post",payload);
    if (error.value) throw createError({ ...error.value, message: "資料異常" });
    return data.value as unknown as AuthRegistry;
  }
 
  return {
    //data
    //methods
    login,
    registry
  };
};
