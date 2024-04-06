import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addProduct, editProduct } from "../redux/productSlice";
import { categoryName } from "../constant";

const AddEditProduct = () => {
  const dispatch = useDispatch();
  const data = useLocation().state;
  const id = data?.id;
  const [formData, setFormData] = useState({
    name: data?.name || "",
    category: data?.category || "",
    description: data?.description || "",
    expiryDate: data?.expiryDate || "",
    costPrice: data?.costPrice || "",
    sellPrice: data?.sellPrice || "",
    discount: data?.discount || "",
    discountedSellPrice: data?.discountedSellPrice || "",
    finalPrice: data?.finalPrice || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };
    if (name === "sellPrice" || name === "discount") {
      const sellPrice = parseFloat(updatedFormData.sellPrice);
      const discount = parseFloat(updatedFormData.discount);
      const discountedSellPrice = sellPrice * (1 - discount / 100);
      const finalPrice = discountedSellPrice.toFixed(2);
      updatedFormData = {
        ...updatedFormData,
        discountedSellPrice: discountedSellPrice.toFixed(2),
        finalPrice: finalPrice,
      };
    }
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(editProduct({ id: parseInt(id), ...formData }));
    } else {
      dispatch(addProduct(formData));
    }
    alert(id ? "Product Updated Successfully" : "Product Added Successfully");
    setFormData({
      name: "",
      category: "",
      description: "",
      expiryDate: "",
      costPrice: "",
      sellPrice: "",
      discount: "",
      discountedSellPrice: "",
      finalPrice: "",
    });
  };
  return (
    <div className="flex justify-center mt-8">
      <div className="w-4/5 md:w-2/3">
        <h2 className="text-2xl font-bold mb-4">
          {id ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="">
          <div className="grid grid-cols-1 md:grid-cols-2 space-y-4 align-baseline items-baseline gap-3">
            <div>
              <label htmlFor="name" className="block mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="category" className="block mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">Select Category</option>
                {categoryName.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
              ></textarea>
            </div>
            <div>
              <label htmlFor="expiryDate" className="block mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="costPrice" className="block mb-1">
                Cost Price
              </label>
              <input
                type="number"
                id="costPrice"
                name="costPrice"
                value={formData.costPrice}
                onChange={handleChange}
                placeholder="Cost Price"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="sellPrice" className="block mb-1">
                Sell Price
              </label>
              <input
                type="number"
                id="sellPrice"
                name="sellPrice"
                value={formData.sellPrice}
                onChange={handleChange}
                placeholder="Sell Price"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="discount" className="block mb-1">
                Discount %
              </label>
              <input
                type="number"
                id="discount"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Discount %"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="discount" className="block mb-1">
                Discounted Sell Price
              </label>
              <input
                type="number"
                id="discountedSellPrice"
                name="discountedSellPrice"
                value={formData.discountedSellPrice}
                placeholder="Discounted Sell Price"
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="discount" className="block mb-1">
                Discounted Sell Price
              </label>
              <input
                type="number"
                id="finalPrice"
                name="finalPrice"
                value={formData.finalPrice}
                placeholder="Final Price"
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <br />
          <button
            type="submit"
            className=" bg-indigo-500 text-white rounded-md px-4 py-2 hover:bg-indigo-600 transition duration-300"
          >
            {id ? "Edit Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;
