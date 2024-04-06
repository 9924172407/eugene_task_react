import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../redux/productSlice";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete selected products?")) {
      dispatch(deleteProduct(selectedProducts));
      setSelectedProducts([]);
    }
  };

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, id]);
    } else {
      setSelectedProducts(
        selectedProducts.filter((productId) => productId !== id)
      );
    }
  };

  const handleEdit = (data) => {
    return navigate(`/product-addEdit`, { state: data });
  };

  return (
    <div className="w-auto mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="flex justify-between mb-4">
        <div>
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          />
        </div>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2  rounded mb-4 px-3 mx-4"
        >
          Delete Selected
        </button>
        <div>
          <label htmlFor="sortBy" className="px-2">
            Sort By:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-4 mx-2 py-2 focus:outline-none"
          >
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="expiryDate">Expiry Date</option>
            <option value="costPrice">Cost Price</option>
            <option value="sellPrice">Sell Price</option>
            <option value="discount">Discount</option>
            <option value="discountedSellPrice">Discounted Sell Price</option>
            <option value="finalPrice">Final Price</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Select</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Expiry Date</th>
            <th className="border border-gray-300 px-4 py-2">Cost Price</th>
            <th className="border border-gray-300 px-4 py-2">Sell Price</th>
            <th className="border border-gray-300 px-4 py-2">Discount %</th>
            <th className="border border-gray-300 px-4 py-2">
              Discounted Sell Price
            </th>
            <th className="border border-gray-300 px-4 py-2">Final Price</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts?.map((product) => (
            <tr key={product?.id} className="bg-white">
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheckboxChange(e, product?.id)}
                  className="form-checkbox h-5 w-5 text-blue-500"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product?.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product?.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product?.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product?.expiryDate}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product?.costPrice}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product?.sellPrice}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product?.discount}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product?.discountedSellPrice}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product?.finalPrice}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteProduct([product.id]))}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
