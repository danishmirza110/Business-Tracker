import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import OrderTable from "../components/orders/OrderTable";
import OrderModal from "../components/orders/OrderModal";
import DeleteOrderModal from "../components/orders/DeleteOrderModal";
import { getOrders,updateOrder } from "../api/orderApi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editOrder,setEditOrder]=useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteOrder, setDeleteOrder] = useState(null);  

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data.data);
    } catch (err) {
      console.log(err);
    }
  };
     useEffect(() => {
     fetchOrders();
   }, []);

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Orders</h2>
          <p className="text-muted">Manage all customer orders</p>
        </div>

        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Order
        </button>
      </div>

      <OrderTable 
        orders={orders} 
        onEdit={(order)=>{
        setEditOrder(order);
        setShowModal(true);
      }} 
      onDelete={(order)=>{
        setDeleteOrder(order);
        setShowDeleteModal(true);
      }}/>

      <OrderModal
        show={showModal}
        handleClose={() =>{ setShowModal(false);
          setEditOrder(null);}
        }
        fetchOrders={fetchOrders}
        editOrder={editOrder}
      />
      <DeleteOrderModal
        show={showDeleteModal}
        handleClose={() => {
        setShowDeleteModal(false);
        setDeleteOrder(null);
  }}
  order={deleteOrder}
  fetchOrders={fetchOrders}
/>
    </DashboardLayout>
  );
}

export default Orders;
