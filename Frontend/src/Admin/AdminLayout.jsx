import { useState, useEffect, useRef } from "react";

const AdminLayout = ({ sidebar, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!sidebarOpen) return;

      // If click is inside sidebar → do nothing
      if (
        sidebarRef.current &&
        sidebarRef.current.contains(event.target)
      ) {
        return;
      }

      // If click is on menu button → do nothing
      if (
        menuRef.current &&
        menuRef.current.contains(event.target)
      ) {
        return;
      }

      // Otherwise close sidebar
      setSidebarOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex min-h-screen bg-gray-100 relative">
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="bg-white border-b px-6 py-3 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-indigo-600">
            Admin Dashboard
          </h2>

          <button
            ref={menuRef}
            onClick={() => setSidebarOpen(true)}
            className="px-3 py-2 cursor-pointer bg-indigo-600 text-white rounded"
          >
            ☰
          </button>
        </header>

        <div className="flex-1">{children}</div>
      </div>

      {/* SIDEBAR */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full bg-white border-l z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } w-64`}
      >
        <div className="relative h-full">
          {/* Close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-3 right-3 text-xl cursor-pointer"
          >
            ✕
          </button>

          {sidebar}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
