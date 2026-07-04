import OrderForm from "./OrderForm";
import { createOrder,updateOrder } from "../../api/orderApi";

function OrderModal({ show, handleClose, fetchOrders,editOrder }) {
  const handleSubmit = async (formData) => {
  try {
    if (editOrder) {
      await updateOrder(editOrder._id, formData);
    } else {
      await createOrder(formData);
    }

    await fetchOrders();
    handleClose();
    alert(
      editOrder
        ? "Order Updated Successfully"
        : "Order Created Successfully"
    );
  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
};
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal d-block">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="fw-bold">Add New Order</h5>

              <button className="btn-close" onClick={handleClose}></button>
            </div>

            <div className="modal-body">
              <OrderForm onSubmit={handleSubmit}
              initialData={editOrder} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
