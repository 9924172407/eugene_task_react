import { Link, Route, Routes } from "react-router-dom";
import ProductList from "./component/ProductList";
import AddEditProduct from "./component/AddEditProduct";

function App() {
  return (
    <>
      <div className="flex justify-center align-middle">
        <Link to={"/"} className="p-5 bg-blue-600 text-white m-2">
          Product List{" "}
        </Link>
        <Link
          to={"/product-addEdit"}
          className="p-5 bg-blue-600 text-white m-2"
        >
          Add Product
        </Link>
      </div>
      <Routes>
        <Route index path="/" element={<ProductList />} />
        <Route path="/product-addEdit" element={<AddEditProduct />} />
      </Routes>
    </>
  );
}

export default App;
