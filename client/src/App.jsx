import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<Home />}
          />

          <Route
            path="products/:id"
            element={
              <ProductDetails />
            }
          />

          <Route
            path="cart"
            element={<Cart />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;