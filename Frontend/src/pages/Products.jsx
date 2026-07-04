import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import DeleteProductModal from "../components/products/DeleteProductModal";
import { getProducts } from "../api/productApi";

function Products() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProduct,setEditProduct]=useState(null);
  const [showDeleteModal,setShowDeleteModal]=useState(false);
  const[deleteProductId,setDeleteProductId]=useState(null);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <DashboardLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold">Products</h2>
          <p className="text-muted mb-0">
            Manage all your products
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Add Product
        </button>

      </div>

      <ProductTable products={products}
      onEdit={(product)=>{
        setEditProduct(product);
        setShowModal(true);
        }} 
        onDelete={(product)=>{
          console.log("button CLicked");
          setDeleteProductId(product);
          setShowDeleteModal(true);
        }}
        />

      <ProductModal
        show={showModal}
        handleClose={() => {setShowModal(false);setEditProduct(null);}}
        fetchProducts={fetchProducts}
        editProduct={editProduct}
      />
      <DeleteProductModal show={showDeleteModal}
        handleClose={()=>{
          setShowDeleteModal(false);
          setDeleteProductId(null);
        }}
        product={deleteProductId}
        fetchProducts={fetchProducts}>
      </DeleteProductModal>

    </DashboardLayout>
  );
}

export default Products;