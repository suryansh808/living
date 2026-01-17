import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate()
  
const menu = [
  { name: "Dashboard", path: "/dashboard", icon: "📊" },
  { name: "Categories", path: "/dashboard/categories", icon: "📁" },
  { name: "Posts", path: "/dashboard/posts", icon: "📝" },
];

const handleLogout = () =>{
        localStorage.removeItem("adminTkn");
        navigate("/")
}

  return (
    <aside className="w-64 bg-white min-h-screen">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-bold text-indigo-600">Admin Panel</h2>
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded ${
              location.pathname === item.path
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-50"
            }`}
          >
          {item.icon} {item.name}

          </Link>
        ))}
         <button onClick={handleLogout} className="px-3 py-2 w-full bg-red-600 cursor-pointer text-white rounded"> Logout </button>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
