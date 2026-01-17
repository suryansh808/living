import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import ScrollToTop from "./ScrollToTop";
// import BlogDetail from "./pages/BlogDetails";
import Adminlogin from "./Admin/Adminlogin";
import AdminProtectedRoute from "./Components/AdminProtectedRoute";
import Dashboard from "./Admin/Dashboard";
import CategoriesPage from "./Admin/CategoriesPage";
import PostsPage from "./Admin/PostsPage";
import CategoryBlogs from "./pages/CategoryBlogs";
import BlogDetail from "./pages/BlogDetail";
import { ErrorBoundary } from "./Components/ErrorBoundary";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
       <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/blog" element={<Blog />} />
        <Route path="/blog/category/:slug" element={<CategoryBlogs />} />
        <Route path="/blog/category/:slug/:id" element={<BlogDetail />} />

        {/* admin route */}
        <Route path="/adminlogin" element={<Adminlogin />} />
        <Route
          path="/dashboard"
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/dashboard/categories"
          element={
            <AdminProtectedRoute>
              <CategoriesPage />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/dashboard/posts"
          element={
            <AdminProtectedRoute>
              <PostsPage/>
            </AdminProtectedRoute>
          }
        />
      </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
