import { useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

function OrderTable({ orders,onEdit,onDelete }) {
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.product?.productName?.toLowerCase().includes(search.toLowerCase()),
  );
  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-success";
      case "Pending":
        return "bg-warning text-dark";
      case "Cancelled":
        return "bg-danger";
      case "Shipped":
        return "bg-info";
      case "Packed":
        return "bg-primary";
      default:
        return "bg-secondary";
    }
  };
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="input-group mb-4">
          <span className="input-group-text">
            <FaSearch />
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Search customer or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Customer</th>

                <th>Product</th>

                <th>Qty</th>

                <th>Total</th>

                <th>Status</th>

                <th>Date</th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No Orders Found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.customerName}</td>

                    <td>{order.product?.productName}</td>

                    <td>{order.quantity}</td>

                    <td>₹{order.totalAmount}</td>

                    <td>
                      <span className={`badge ${getStatusBadge(order.status)}`}>
                        {order.status}
                      </span>
                    </td>

                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                    <td>
                      <button className="btn btn-outline-warning btn-sm me-2" onClick={()=>{
                        onEdit(order);
                      }}>
                        <FaEdit />
                      </button>

                      <button className="btn btn-outline-danger btn-sm" 
                      onClick={() => onDelete(order)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderTable;
