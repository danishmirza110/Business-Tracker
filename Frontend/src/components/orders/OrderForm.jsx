import { useEffect, useState } from "react";
import { getProducts, } from "../../api/productApi";

function OrderForm({ onSubmit, initialData = {} }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    productid: "",
    productName: "",
    quantity: 1,
    totalAmount: 0,
    orderStatus: "Pending",
    paymentStatus: "Unpaid",
  });

  // Fetch Products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fill Form in Edit Mode
  useEffect(() => {
    if (
      initialData &&
      Object.keys(initialData).length > 0 &&
      products.length > 0
    ) {
      const productId =
        initialData.productid?._id || initialData.productid;

      const product = products.find((p) => p._id === productId);

      setSelectedProduct(product || null);

      setFormData({
        customerName: initialData.customerName || "",
        customerPhone: initialData.customerPhone || "",
        productid: productId || "",
        productName: initialData.productName || "",
        quantity: initialData.quantity || 1,
        totalAmount: initialData.totalAmount || 0,
        orderStatus: initialData.orderStatus || "Pending",
        paymentStatus: initialData.paymentStatus || "Unpaid",
      });
    }
  }, [initialData, products]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "productid") {
      const product = products.find((p) => p._id === value);

      if (!product) return;

      setSelectedProduct(product);

      setFormData((prev) => ({
        ...prev,
        productid: product._id,
        productName: product.productName,
        totalAmount: product.sellingPrice * prev.quantity,
      }));

      return;
    }

    if (name === "quantity") {
      const qty = Number(value);

      setFormData((prev) => ({
        ...prev,
        quantity: qty,
        totalAmount: selectedProduct
          ? selectedProduct.sellingPrice * qty
          : 0,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>

      {/* Customer Name */}

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Customer Name
        </label>

        <input
          type="text"
          className="form-control"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Customer Phone */}

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Customer Phone
        </label>

        <input
          type="text"
          className="form-control"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleChange}
        />
      </div>

      {/* Product */}

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Product
        </label>

        <select
          className="form-select"
          name="productid"
          value={formData.productid}
          onChange={handleChange}
          required
        >
          <option value="">Select Product</option>

          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.productName}
            </option>
          ))}
        </select>
      </div>

      {/* Product Info */}

      {selectedProduct && (
        <div className="card bg-light border-0 mb-3 p-3">

          <div className="d-flex justify-content-between">

            <span>
              <strong>Stock</strong>
            </span>

            <span>{selectedProduct.stock}</span>

          </div>

          <div className="d-flex justify-content-between">

            <span>
              <strong>Selling Price</strong>
            </span>

            <span>₹{selectedProduct.sellingPrice}</span>

          </div>

          <div className="d-flex justify-content-between">

            <span>
              <strong>Total Amount</strong>
            </span>

            <span className="fw-bold text-success">
              ₹{formData.totalAmount}
            </span>

          </div>

        </div>
      )}

      {/* Quantity */}

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Quantity
        </label>

        <input
          type="number"
          className="form-control"
          name="quantity"
          min="1"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>

      {/* Order Status */}

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Order Status
        </label>

        <select
          className="form-select"
          name="orderStatus"
          value={formData.orderStatus}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Returned">Returned</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Payment Status */}

      <div className="mb-4">
        <label className="form-label fw-semibold">
          Payment Status
        </label>

        <select
          className="form-select"
          name="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleChange}
        >
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
        </select>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
      >
        {initialData?._id ? "Update Order" : "Save Order"}
      </button>

    </form>
  );
}

export default OrderForm;