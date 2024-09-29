import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const Dashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers(page);
        setUsers(data.data); // User data
        setTotalPages(data.total_pages); // Total pages for pagination
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    getUsers();
  }, [page]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast("Logout Successfully. Redirecting to Login Page....")
    setTimeout(() => {
      navigate("/login");
    }, 3000);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard
            key={user.id}
            avatar={user.avatar}
            firstName={user.first_name}
            lastName={user.last_name}
            email={user.email}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-3 py-1">{`Page ${page} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="px-3 py-1 bg-gray-300 text-gray-600 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Dashboard;
