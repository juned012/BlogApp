import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddBlog from "../../components/AddBlog";
import { Plus } from "lucide-react";
import { UserContext } from "../../context/UserContext";

const AuthorDashboard = () => {
  const { authorPosts, handleGetPostOfAuthor, handleDeletePostAuthor } =
    useContext(UserContext);
  const [isOpenEditor, setIsOpenEditor] = useState(false);
  useEffect(() => {
    handleGetPostOfAuthor();
  }, []);
  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 space-y-6 min-h-screen"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Author Dashboard</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpenEditor(true)}
          className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-md shadow hover:bg-orange-700 transition"
        >
          <Plus size={18} /> Post Blog
        </motion.button>
      </div>

      <p className="text-gray-600">
        Welcome back! You can create new blogs or manage your existing posts
        below.
      </p>

      <motion.div
        className="grid gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {authorPosts && authorPosts.length > 0 ? (
          authorPosts.map((blog, index) => (
            <motion.div
              key={blog._id || index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white flex justify-between items-start"
            >
              <div>
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  {(blog.summary?.length ?? 0) > 100
                    ? blog.summary.slice(0, 100) + "..."
                    : blog.summary ?? ""}
                </p>
                <span
                  className={`mt-2 inline-block text-xs px-2 py-1 rounded-full ${
                    blog.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {blog.status}
                </span>
              </div>
              <div className="space-x-2">
                <button className="text-blue-600 text-sm hover:underline">
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePostAuthor(blog._id)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p>No posts found. You can add your first blog post!</p>
        )}
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpenEditor && <AddBlog onClose={() => setIsOpenEditor(false)} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default AuthorDashboard;
