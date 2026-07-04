import { useEffect, useState } from "react";

function ExpenseForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Misc",
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        title: initialData.title || "",
        amount: initialData.amount || "",
        category: initialData.category || "Misc",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Expense Title */}

      <div className="mb-3">
        <label className="form-label fw-semibold">Expense Title</label>

        <input
          type="text"
          className="form-control"
          name="title"
          placeholder="Enter Expense Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* Category */}

      <div className="mb-3">
        <label className="form-label fw-semibold">Category</label>

        <select
          className="form-select"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Packaging">Packaging</option>
          <option value="Courier">Courier</option>
          <option value="Ads">Ads</option>
          <option value="Misc">Misc</option>
        </select>
      </div>

      {/* Amount */}

      <div className="mb-4">
        <label className="form-label fw-semibold">Amount</label>

        <input
          type="number"
          className="form-control"
          name="amount"
          placeholder="Enter Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {initialData?._id ? "Update Expense" : "Save Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
