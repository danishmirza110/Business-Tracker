import { deleteOrder } from "../../api/orderApi";

function DeleteOrderModal({ show, handleClose, order, fetchOrders }) {
  if (!show) return null;

  const handleDelete = async () => {
    try {
      await deleteOrder(order._id);

      await fetchOrders();

      handleClose();

      alert("Order Deleted Successfully");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Delete Order</h5>

              <button className="btn-close" onClick={handleClose}></button>
            </div>

            <div className="modal-body">
              <p>Are you sure you want to delete this order?</p>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>
                Cancel
              </button>

              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteOrderModal;
