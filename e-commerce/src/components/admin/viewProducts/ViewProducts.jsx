import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ref, remove, get } from "firebase/database"; // Realtime Database methods
import { db, storage } from "../../../firebase/config";
import styles from "./ViewProducts.module.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../loader/Loader";
import { deleteObject, ref as storageRef } from "firebase/storage";
import Notiflix from "notiflix";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/slice/productSlice";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "../../../redux/slice/filterSLice";
import Search from "../../search/Search";
import Pagination from "../../pagination/Pagination";

const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  
  const dispatch = useDispatch();

  // Fetch products from Firebase Realtime Database
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const productsRef = ref(db, "products");
      try {
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
          const productsArray = [];
          snapshot.forEach((childSnapshot) => {
            productsArray.push({ id: childSnapshot.key, ...childSnapshot.val() });
          });
          setProducts(productsArray);
          setFilteredProducts(productsArray); // Initial filtering state
        } else {
          setProducts([]);
        }
      } catch (error) {
        toast.error("Failed to fetch products: " + error.message);
      }
      setIsLoading(false);
    };
    
    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products,
      })
    );
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const confirmDelete = (id, imageURL) => {
    Notiflix.Confirm.show(
      "Delete Product!!!",
      "You are about to delete this product",
      "Delete",
      "Cancel",
      function okCb() {
        deleteProduct(id, imageURL);
      },
      function cancelCb() {
        console.log("Delete Canceled");
      },
      {
        width: "320px",
        borderRadius: "3px",
        titleColor: "orangered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom",
      }
    );
  };

  const deleteProduct = async (id, imageURL) => {
    try {
      // Delete product from Firebase Realtime Database
      await remove(ref(db, `products/${id}`));

      // Delete the image from Firebase Storage
      const imageRef = storageRef(storage, imageURL);
      await deleteObject(imageRef);
      
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete product: " + error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <h2>All Products</h2>

        <div className={styles.search}>
          <p>
            <b>{filteredProducts.length}</b> products found
          </p>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filteredProducts.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => confirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        />
      </div>
    </>
  );
};

export default ViewProducts;
