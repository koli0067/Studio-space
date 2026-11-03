import { headers } from "next/headers";
import { auth } from "./auth";


const GetTokenFromServer = async() => {
      const jwtToken = await auth.api.getToken({
    headers: await headers(),
  })
  
  const token = jwtToken?.token;
  console.log(token);
  return token
}

export default GetTokenFromServer