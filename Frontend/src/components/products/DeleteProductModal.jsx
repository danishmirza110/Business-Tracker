import { deleteProduct } from "../../api/productApi";

function DeleteProductModal({
  show,
  handleClose,
  product,
  fetchProducts,
}) {

  if (!show) return null;

  const handleDelete = async () => {
    try {

      await deleteProduct(product._id);

      await fetchProducts();

      handleClose();

      alert("Product Deleted Successfully");

    } catch (error) {

      console.log(error);

      alert("Failed to delete product");

    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>

      <div className="modal d-block">

        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">

            <div className="modal-header">

              <h5 className="text-danger">
                Delete Product
              </h5>

            </div>

            <div className="modal-body">

              <p>

                Are you sure you want to delete

                <strong>

                  {" "}
                  {product?.productName}

                </strong>

                ?

              </p>

              <p className="text-danger">

                This action cannot be undone.

              </p>

            </div>

            <div className="modal-footer">

              <button
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default DeleteProductModal;