import api from "../../utils/axios.js"

async function logOut() {
  try{
    const {data}=await api.get("/api/auth/logout")
    return data?.success || false
  }
  catch(error){
    console.log("Failed to logout:", error);

    return false
  }
}

export default logOut