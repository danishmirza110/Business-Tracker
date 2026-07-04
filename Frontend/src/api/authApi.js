import axiosInstance from "./axios";

export const registerUser=async(userData)=>{
  try{
    const response=await axiosInstance.post('/auth/register',userData);
    return response.data;
  }catch(err){
    console.log(err);
  }
};

export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);
  return response.data;
};
