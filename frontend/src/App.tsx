import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Loader from "./pages/Loader";

const HomePage = lazy(() => import("./pages/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const ItemPage = lazy(() => import("./pages/ItemPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));

function App() {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/catalog" element={<CatalogPage />}></Route>
        <Route path="/catalog/:id" element={<ItemPage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;
