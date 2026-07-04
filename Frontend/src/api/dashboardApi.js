import axiosInstance from "./axios";

// Dashboard Cards
export const getDashboard = async () => {
  const response = await axiosInstance.get("/dashboard");
  return response.data;
};

// Revenue Line Chart
export const getMonthlyStats = async () => {
  const response = await axiosInstance.get("/dashboard/monthly-stats");
  return response.data;
};

// Order Status Pie Chart
export const getOrderStatus = async () => {
  const response = await axiosInstance.get("/dashboard/order-status");
  return response.data;
};

// Recent Orders
export const getRecentOrders = async () => {
  const response = await axiosInstance.get("/dashboard/recent-orders");
  return response.data;
};

// Low Stock Products
export const getLowStockProducts = async () => {
  const response = await axiosInstance.get("/dashboard/low-stock");
  return response.data;
};