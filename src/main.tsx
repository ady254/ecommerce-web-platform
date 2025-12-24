import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// ⭐ Import CartProvider
import { CartProvider } from "./context/CartContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* 👍 Wrap App with CartProvider so cart works globally */}
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
