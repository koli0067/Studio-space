import { authClient } from "./auth-client";


const GetTokenFromClient = async() => {
     const { data } = await authClient.token();
     const token = data?.token;

  return token;
}

export default GetTokenFromClient;