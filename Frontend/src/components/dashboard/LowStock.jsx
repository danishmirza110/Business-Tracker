import React, { useEffect,useState } from 'react'
import {getLowStockProducts} from '../../api/dashboardApi';
import { FaExclamationTriangle } from "react-icons/fa";

const LowStockTable = () => {
  const[products,setProducts]=useState([]);
  useEffect(()=>{
    fetchLowStock();
  },[])

  const fetchLowStock=async()=>{
    try{
      const data=await getLowStockProducts();
      setProducts(data.products);
    }catch(err){
      console.log(err);
    }
  }


  return (
    <div className="card shadow-sm border-0 h-100">

      <div className="card-header bg-white d-flex align-items-center gap-2">
        <FaExclamationTriangle className="text-warning" />
        <h5 className="mb-0">Low Stock Products</h5>
      </div>

      <div className="card-body p-0">

        <table className="table table-hover mb-0">

          <thead className="table-light">
            <tr>
              <th>Product</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>

            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>

                  <td>{product.productName}</td>

                  <td>
                    <span className="badge bg-danger">
                      {product.stock}
                    </span>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center py-4">
                  No Low Stock Products
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default LowStockTable;
