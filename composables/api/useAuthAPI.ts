import { AuthLogin, AuthRegistry, AuthLoginRespon, AuthRegistryRespon } from "@/types/auth" 
import useApiBase from "./useApiBase"

export default () => {
  const { fetchApiBase } = useApiBase()

  //MyModel API
  async function login(payload: AuthLogin): Promise<AuthLoginRespon> {
    const { token} = await fetchApiBase("/login", "post",payload,);
    return {token} as unknown as AuthLoginRespon;
  }
  async function registry(payload: AuthRegistry): Promise<AuthRegistryRespon> {
    const { user} = await fetchApiBase("/register","post",payload);
    return user as unknown as AuthRegistryRespon;
  }
 
  return {
    //data
    //methods
    login,
    registry
  };
};
