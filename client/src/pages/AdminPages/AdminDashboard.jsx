import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  PlusCircle,
  BarChart2,
  Users,
  FileText,
  BookOpenCheck,
} from "lucide-react";
import AddBlog from "../../components/AddBlog";

const AdminDashboard = () => {
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);

  useEffect(() => {
    // Dummy data for now - replace with real API calls later
    setTotalUsers(1250);
    setTotalBlogs(78);
    setRecentUsers([
      {
        name: "Brooklyn Taylor",
        email: "brooklyn@example.com",
        joined: "2025-07-25",
      },
      {
        name: "Madison Clark",
        email: "madison@example.com",
        joined: "2025-07-24",
      },
      {
        name: "Harper Davis",
        email: "harper@example.com",
        joined: "2025-07-23",
      },
      {
        name: "Addison Smith",
        email: "addison@example.com",
        joined: "2025-07-22",
      },
      {
        name: "Avery Johnson",
        email: "avery@example.com",
        joined: "2025-07-21",
      },
    ]);
    setRecentBlogs([
      {
        title: "How to Learn React",
        author: "Brooklyn Taylor",
        date: "2025-07-25",
      },
      {
        title: "Node.js Best Practices",
        author: "Madison Clark",
        date: "2025-07-24",
      },
      {
        title: "Tailwind vs Bootstrap",
        author: "Addison Smith",
        date: "2025-07-23",
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-white p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={() => setIsOpenEditor(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-all shadow-lg"
        >
          <PlusCircle className="w-5 h-5" /> Create Blog
        </button>
      </header>

      {/* Analytics Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all">
          <BarChart2 className="text-blue-600 mb-2" />
          <h2 className="text-xl font-semibold">Total Views</h2>
          <p className="text-3xl font-bold mt-2">45,000</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all">
          <Users className="text-green-600 mb-2" />
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{totalUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all">
          <FileText className="text-purple-600 mb-2" />
          <h2 className="text-xl font-semibold">Published Blogs</h2>
          <p className="text-3xl font-bold mt-2">{totalBlogs}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all">
          <BookOpenCheck className="text-yellow-500 mb-2" />
          <h2 className="text-xl font-semibold">New Posts Today</h2>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>
      </section>

      {/* Recent Users Table */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Recent Users</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 font-medium text-gray-800">{user.name}</td>
                  <td className="p-3 text-gray-600">{user.email}</td>
                  <td className="p-3 text-gray-600">{user.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Blogs Table */}
      <section>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Recent Blogs</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Author</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentBlogs.map((blog, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 font-medium text-gray-800">
                    {blog.title}
                  </td>
                  <td className="p-3 text-gray-600">{blog.author}</td>
                  <td className="p-3 text-gray-600">{blog.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Blog Editor Modal */}
      <AnimatePresence>
        {isOpenEditor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-screen overflow-y-auto p-6 relative"
            >
              <button
                onClick={() => setIsOpenEditor(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-700">
                Create New Blog
              </h2>
              <AddBlog />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
