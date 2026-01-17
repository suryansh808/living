import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import * as adminService from "../services/adminService";
import { Toaster, toast } from "react-hot-toast";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalPosts: 0,
    publishedToday: 0,
  });




  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await adminService.getAdminStats();
        setStats(data);
      } catch (err) {
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  return (
    <AdminLayout sidebar={<AdminSidebar/>}>
      <main className="flex-1 p-8">
        <Toaster />

        <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

        {loading ? (
          <p>Loading statistics...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-600">Total Categories</h3>
              <p className="text-3xl font-bold text-indigo-600">
                {stats.totalCategories}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-600">Total Posts</h3>
              <p className="text-3xl font-bold text-indigo-600">
                {stats.totalPosts}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-gray-600">Published Today</h3>
              <p className="text-3xl font-bold text-indigo-600">
                {stats.publishedToday}
              </p>
            </div>
          </div>
        )}
      </main>
    </AdminLayout>
  );
};

export default AdminDashboard;
