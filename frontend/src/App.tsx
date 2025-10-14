import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Loader from "./pages/common/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "./components/auth/RegisterForm";
import LoginForm from "./components/auth/LoginForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const AdminCategoriesPage = lazy(
  () => import("./pages/admin/categories/AdminCategoriesPage"),
);
const AdminCategoriesEditPage = lazy(
  () => import("./pages/admin/categories/AdminCategoriesEditPage"),
);
const AdminCategoriesAddPage = lazy(
  () => import("./pages/admin/categories/AdminCategoriesAddPage"),
);

const HomePage = lazy(() => import("./pages/home/HomePage"));
const CatalogPage = lazy(() => import("./pages/catalog/CatalogPage"));
const ItemPage = lazy(() => import("./pages/catalog/ItemPage"));
const NotFoundPage = lazy(() => import("./pages/common/NotFoundPage"));
const CartPage = lazy(() => import("./pages/cart/CartPage"));
const DeliveryPage = lazy(() => import("./pages/cart/DeliveryPage"));
const AccountPage = lazy(() => import("./pages/account/AccountPage"));
const AccountMainPage = lazy(() => import("./pages/account/AccountMainPage"));
const FavoritesItemPage = lazy(
  () => import("./pages/account/FavoritesItemPage"),
);
const OrdersPage = lazy(() => import("./pages/account/OrdersPage"));
const AdminPage = lazy(() => import("./pages/admin/AdminPage"));

const AdminUsersPage = lazy(() => import("./pages/admin/users/AdminUsersPage"));
const AdminItemsPage = lazy(() => import("./pages/admin/items/AdminItemsPage"));
const AdminOrdersPage = lazy(
  () => import("./pages/admin/orders/AdminOrdersPage"),
);
const AdminUsersEditPage = lazy(
  () => import("./pages/admin/users/AdminUsersEditPage"),
);
const AdminOrdersEditPage = lazy(
  () => import("./pages/admin/orders/AdminOrdersEditPage"),
);
const AdminItemsEditPage = lazy(
  () => import("./pages/admin/items/AdminItemsEditPage"),
);
const AdminUsersAddPage = lazy(
  () => import("./pages/admin/users/AdminUsersAddPage"),
);
const AdminOrdersAddPage = lazy(
  () => import("./pages/admin/orders/AdminOrdersAddPage"),
);
const AdminItemsAddPage = lazy(
  () => import("./pages/admin/items/AdminItemsAddPage"),
);

const AdminCollectionsPage = lazy(
  () => import("./pages/admin/collections/AdminCollectionsPage"),
);
const AdminCollectionsEditPage = lazy(
  () => import("./pages/admin/collections/AdminCollectionsEditPage"),
);
const AdminCollectionsAddPage = lazy(
  () => import("./pages/admin/collections/AdminCollectionsAddPage"),
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/catalog/:category" element={<CatalogPage />} />
        <Route path="/catalog/:category/:id" element={<ItemPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route
        path="/account/*"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      >
        <Route index element={<AccountMainPage />} /> 
        <Route path="favorites" element={<FavoritesItemPage />} />
        <Route path="orders" element={<OrdersPage />} />
      </Route>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<AdminPage />}>
                  <Route path="users" element={<AdminUsersPage />} />
                  <Route
                    path="users/:id/edit"
                    element={<AdminUsersEditPage />}
                  />
                  <Route path="users/add" element={<AdminUsersAddPage />} />
                  <Route path="orders" element={<AdminOrdersPage />} />
                  <Route
                    path="orders/:id/edit"
                    element={<AdminOrdersEditPage />}
                  />
                  <Route path="orders/add" element={<AdminOrdersAddPage />} />
                  <Route path="items" element={<AdminItemsPage />} />
                  <Route
                    path="items/:id/edit"
                    element={<AdminItemsEditPage />}
                  />
                  <Route path="items/add" element={<AdminItemsAddPage />} />
                  <Route path="categories" element={<AdminCategoriesPage />} />
                  <Route
                    path="categories/:id/edit"
                    element={<AdminCategoriesEditPage />}
                  />
                  <Route
                    path="categories/add"
                    element={<AdminCategoriesAddPage />}
                  />
                  <Route
                    path="collections"
                    element={<AdminCollectionsPage />}
                  />
                  <Route
                    path="collections/:id/edit"
                    element={<AdminCollectionsEditPage />}
                  />
                  <Route
                    path="collections/add"
                    element={<AdminCollectionsAddPage />}
                  />
                </Route>
              </Routes>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <LoginForm />
      <RegisterForm />
      <ToastContainer position="top-right" autoClose={3000} />
    </Suspense>
  );
}

export default App;
