import ExpenseForm from "./ExpenseForm";
import {
  createExpense,
  updateExpense,
} from "../../api/expenseApi";

function ExpenseModal({
  show,
  handleClose,
  fetchExpenses,
  editExpense,
}) {
  const handleSubmit = async (formData) => {
    try {
      if (editExpense) {
        await updateExpense(editExpense._id, formData);
      } else {
        await createExpense(formData);
      }

      await fetchExpenses();

      handleClose();

      alert(
        editExpense
          ? "Expense Updated Successfully"
          : "Expense Added Successfully"
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
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="fw-bold">
                {editExpense ? "Edit Expense" : "Add Expense"}
              </h5>

              <button
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>

            <div className="modal-body">
              <ExpenseForm
                onSubmit={handleSubmit}
                initialData={editExpense}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ExpenseModal;