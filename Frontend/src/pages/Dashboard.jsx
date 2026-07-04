import DashboardLayout from "../layout/DashboardLayout";
import {
  FaBox,
  FaShoppingCart,
  FaMoneyBillWave,
  FaChartLine,
  FaWallet,
  FaChartPie,
} from "react-icons/fa";
import StatCard from "../components/dashboard/StatCard";
import { useEffect, useState } from "react";
import { getDashboard } from "../api/dashboardApi";
import RevenueChart from "../components/dashboard/RevenueChart";
import OrderStatusChart from "../components/dashboard/OrderPieChart";
import RecentOrdersTable from "../components/dashboard/RecentOrders"
import LowStockTable from "../components/dashboard/LowStock";



function Dashboard() {
  
   const[dashboardData,setDashboardData]=useState(null);

  //  for name

    const user = JSON.parse(localStorage.getItem("user"));
  //  dashboard se data fetch krte hai
   const fetchDashboard=async()=>{
    try{
      const data=await getDashboard();
      setDashboardData(data);
    }catch(err){
      console.log(err);
    }
   }
   useEffect(()=>{
    fetchDashboard();
   },[]);

  //  cards data

  const cards = [
  {
    title: "Total Products",
    value: dashboardData?.totalProduct || 0,
    icon: <FaBox />,
    color: "#2563eb",
  },
  {
    title: "Total Orders",
    value: dashboardData?.totalOrder || 0,
    icon: <FaShoppingCart />,
    color: "#22c55e",
  },
  {
    title: "Revenue",
    value: `₹${dashboardData?.totalRevenue||0}`,
    icon: <FaMoneyBillWave />,
    color: "#f59e0b",
  },
  {
    title: "Profit",
    value: `₹${dashboardData?.totalProfit||0}`,
    icon: <FaChartLine />,
    color: "#9333ea",
  },
  {
    title: "Expenses",
    value: `₹${dashboardData?.totalExpense||0}`,
    icon: <FaWallet />,
    color: "#ef4444",
  },
  {
    title: "Net Profit",
    value: `₹${dashboardData?.netProfit||0}`,
    icon: <FaChartPie />,
    color: "#06b6d4",
  },
];

const monthlyData = [
{
month:"Jan",
revenue:12000,
profit:3000
},
{
month:"Feb",
revenue:18000,
profit:5000
},
{
month:"Mar",
revenue:15000,
profit:4500
},
{
month:"Apr",
revenue:22000,
profit:7000
},
{
month:"May",
revenue:28000,
profit:8500
},
{
month:"Jun",
revenue:32000,
profit:10000
}
]

// pie chart data
const data = [
  { name: "Delivered", value: 45 },
  { name: "Pending", value: 25 },
  { name: "Cancelled", value: 10 },
];

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <p>Welcome back, {user?.name} 👋</p>
        </div>
      </div>

      {/* Cards */}
      <div className="dashboard-grid">
        {cards.map((card)=>(
          <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
          />
        ))}

      </div>
      <div className="row mt-4">
      <div className="col-lg-8">
      <RevenueChart data={monthlyData}/>
      </div>
      <div className="col-lg-4">
      <OrderStatusChart data={data}></OrderStatusChart>
      </div>
      </div>
      <div className="row mt-4">
        <div className="col-lg-8">
          <RecentOrdersTable></RecentOrdersTable>
        </div>
        <div className="col-lg-4">
          <LowStockTable/>
        </div>
      </div>
      
    </DashboardLayout>
  );
}

export default Dashboard;