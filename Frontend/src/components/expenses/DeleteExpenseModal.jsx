import { deleteExpense } from "../../api/expenseApi";

function DeleteExpenseModal({ show, handleClose, expense, fetchExpenses }) {
  if (!show) return null;

  const handleDelete = async () => {
    try {
      await deleteExpense(expense._id);

      await fetchExpenses();

      handleClose();

      alert("Expense Deleted Successfully");
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
              <h5 className="fw-bold">Delete Expense</h5>

              <button className="btn-close" onClick={handleClose}></button>
            </div>

            <div className="modal-body">
              <p>Are you sure you want to delete this expense?</p>

              <h6 className="text-danger">{expense?.title}</h6>
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

export default DeleteExpenseModal;
