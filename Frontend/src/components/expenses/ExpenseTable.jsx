import { useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

function ExpenseTable({ expenses = [], onEdit, onDelete }) {
  const [search, setSearch] = useState("");

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.title.toLowerCase().includes(search.toLowerCase()) ||
      expense.category.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        {/* Search */}

        <div className="input-group mb-4">
          <span className="input-group-text">
            <FaSearch />
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Search Expense..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}

        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>

                <th>Category</th>

                <th>Amount</th>

                <th>Date</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No Expenses Found
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((expense) => (
                  <tr key={expense._id}>
                    <td>{expense.title}</td>

                    <td>
                      <span className="badge bg-primary">
                        {expense.category}
                      </span>
                    </td>

                    <td className="fw-bold text-danger">₹{expense.amount}</td>

                    <td>{new Date(expense.createdAt).toLocaleDateString()}</td>

                    <td>
                      <button
                        className="btn btn-outline-warning btn-sm me-2"
                        onClick={() => onEdit(expense)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => onDelete(expense)}
                      >
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

export default ExpenseTable;
