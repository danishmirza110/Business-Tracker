import { useState } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

function ProductTable({ products,onEdit,onDelete }) {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card border-0 shadow-sm">

      <div className="card-body">

        <div className="input-group mb-4">

          <span className="input-group-text">
            <FaSearch />
          </span>

          <input
            type="text"
            className="form-control"
            placeholder="Search Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <table className="table table-hover align-middle">

          <thead className="table-light">

            <tr>

              <th>Product</th>

              <th>Category</th>

              <th>Stock</th>

              <th>Cost Price</th>

              <th>Selling Price</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr key={product._id}>

                <td>{product.productName}</td>

                <td>{product.category}</td>

                <td>

                  <span
                    className={`badge ${
                      product.stock <= 5
                        ? "bg-danger"
                        : "bg-success"
                    }`}
                  >
                    {product.stock}
                  </span>

                </td>

                <td>₹{product.costPrice}</td>

                <td>₹{product.sellingPrice}</td>

                <td>

                  <button className="btn btn-warning btn-sm me-2 " onClick={()=>onEdit(product)}>
                    <FaEdit />
                  </button>

                  <button className="btn btn-danger btn-sm" onClick={()=>onDelete(product)} >
                    <FaTrash />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ProductTable;