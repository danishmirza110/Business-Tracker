import axiosInstance from "./axios";

export const getOrders=async()=>{
  const response=await axiosInstance.get("/orders");
  return response.data;
};

export const createOrder=async(orderData)=>{
  const response=await axiosInstance.post("/orders",orderData);
  return response.data;
} 
export const updateOrder = async (id, orderData) => {
  const response = await axiosInstance.put(
    `/orders/${id}`,
    orderData
  );

  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await axiosInstance.delete(`/orders/${id}`);
  return response.data;
};