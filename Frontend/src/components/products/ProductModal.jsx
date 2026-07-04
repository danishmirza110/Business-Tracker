import ProductForm from "./ProductForm";
import { addProduct,updateProduct } from "../../api/productApi";

function ProductModal({
  show,
  handleClose,
  fetchProducts,
  editProduct,
}) {

  const handleSubmit = async (formData) => {
    try {
      if(editProduct){
        await updateProduct(editProduct._id,formData);
        alert("Product Updated Successfully");
      }else{
      await addProduct(formData);
      alert("Product Added Successfully");
      }
      await fetchProducts();

      handleClose();

    } catch (error) {

      console.log(error);

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

              <h5>
                {editProduct?"Edit Product":"Add Product"}
              </h5>

              <button
                className="btn-close"
                onClick={handleClose}
              ></button>

            </div>

            <div className="modal-body">

              <ProductForm
                initialData={editProduct}
                onSubmit={handleSubmit}
              />

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default ProductModal;