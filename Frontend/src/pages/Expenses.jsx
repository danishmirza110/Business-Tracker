import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseModal from "../components/expenses/ExpenseModal";
import DeleteExpenseModal from "../components/expenses/DeleteExpenseModal";
import { getExpenses } from "../api/expenseApi";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editExpense, setEditExpense] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteExpense, setDeleteExpense] = useState(null);

  const fetchExpenses = async () => {
    try {
      const response = await getExpenses();
      setExpenses(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <DashboardLayout>

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">Expenses</h2>
          <p className="text-muted">
            Manage all business expenses
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Add Expense
        </button>

      </div>

      <ExpenseTable
        expenses={expenses}
        onEdit={(expense) => {
          setEditExpense(expense);
          setShowModal(true);
        }}
        onDelete={(expense) => {
          setDeleteExpense(expense);
          setShowDeleteModal(true);
        }}
      />

      <ExpenseModal
        show={showModal}
        handleClose={() => {
          setShowModal(false);
          setEditExpense(null);
        }}
        fetchExpenses={fetchExpenses}
        editExpense={editExpense}
      />

      <DeleteExpenseModal
        show={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
          setDeleteExpense(null);
        }}
        expense={deleteExpense}
        fetchExpenses={fetchExpenses}
      />

    </DashboardLayout>
  );
}

export default Expenses;