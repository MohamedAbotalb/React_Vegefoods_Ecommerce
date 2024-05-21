import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { ProductShow } from "../Components/Products/crud/ProductShow";
import { ProductCreate } from "../Components/Products/crud/ProductCreate";
import { ProductUpdate } from "../Components/Products/crud/ProductUpdate";
import { ProductDelete } from "../Components/Products/crud/ProductDelete";
import {
  fetchProducts,
  addNewProduct,
  updateProductById,
  deleteProductById,
} from "../store/productsSlice";
import { Loader } from "../Components/Loader";

export function ProductsTable() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchProducts()).then(() => {
      setTimeout(() => {
        setInitialLoading(false);
      }, 1000);
    });
  }, [dispatch]);

  const handleAddProduct = (newProduct) => {
    dispatch(addNewProduct(newProduct));
  };

  const handleUpdateProduct = (id, updatedProduct) => {
    dispatch(updateProductById({ id, updatedProduct }));
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProductById(id));
  };

  if (initialLoading || loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <section className="my-5">
        <div className="container">
          <div className="row justify-content-between">
            <h2 className="col-md-6">Products Table</h2>

            <div className="col-md-6 mb-4 text-end">
              <ProductCreate addProduct={handleAddProduct} />
            </div>
          </div>
          <Table striped hover className="text-center">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>${product.price}</td>
                    <td>{product.hasDiscount ? "Yes" : "No"}</td>
                    <td>
                      <ProductShow product={product} />
                      <ProductUpdate
                        product={product}
                        onUpdate={handleUpdateProduct}
                      />
                      <ProductDelete
                        product={product}
                        onDelete={handleDeleteProduct}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
}
