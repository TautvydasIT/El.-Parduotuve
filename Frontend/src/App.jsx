import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Help from "./pages/Help";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-800">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/types/:typeId/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
