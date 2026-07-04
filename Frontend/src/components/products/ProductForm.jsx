import { useState } from "react";

function ProductForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    productName: initialData?.productName || "",
    category: initialData?.category || "",
    costPrice: initialData?.costPrice || "",
    sellingPrice: initialData?.sellingPrice || "",
    stock: initialData?.stock || "",
  });

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
      {/* Product Name */}

      <div className="mb-3">
        <label className="form-label fw-semibold">Product Name</label>

        <input
          type="text"
          name="productName"
          className="form-control"
          placeholder="Enter Product Name"
          value={formData.productName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Category */}

      <div className="mb-3">
        <label className="form-label fw-semibold">Category</label>
        <select
          name="category"
          className="form-select"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Grocery">Grocery</option>
          <option value="Accessories">Accessories</option>
          <option value="Sports">Sports</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Cost & Selling */}

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Cost Price</label>

          <input
            type="number"
            name="costPrice"
            className="form-control"
            value={formData.costPrice}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="col-md-6 mb-3">
          <label className="form-label fw-semibold">Selling Price</label>

          <input
            type="number"
            name="sellingPrice"
            className="form-control"
            value={formData.sellingPrice}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Stock */}

      <div className="mb-4">
        <label className="form-label fw-semibold">Stock</label>

        <input
          type="number"
          name="stock"
          className="form-control"
          value={formData.stock}
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn-primary w-100" type="submit">
        Save Product
      </button>
    </form>
  );
}
export default ProductForm;
