import { useEffect, useState } from "react";
import { getRecentOrders } from "../../api/dashboardApi";

function RecentOrdersTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders=async()=>{
    try{
      const data=await getRecentOrders();
      setOrders(data.orders)
    }catch(err){
      console.log(err)
    }
  };

  return (
    <div className="card shadow-sm border-0 h-100">
      <div className="card-header bg-white">
        <h5 className="mb-0">Recent Orders</h5>
      </div>

      <div className="card-body p-0">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.product?.productName}</td>
                <td>{order.quantity}</td>

                <td>
                  <span
                    className={`badge ${
                      order.orderStatus === "Delivered"
                        ? "bg-success"
                        : order.orderStatus === "Pending"
                        ? "bg-warning text-dark"
                        : "bg-danger"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </td>

                <td>₹{order.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrdersTable;