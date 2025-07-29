import axios from "axios";
import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { UserContext } from "./../context/UserContext";

const Input = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block mb-1 font-medium text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
      required
    />
  </div>
);

const AddBlog = ({ onClose }) => {
  const { handlePostBlogByUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    summary: "",
    tags: "",
    readTime: "",
    description: "",
    status: "draft",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handlePostBlogByUser(formData);
      onClose();
    } catch (error) {
      console.error("Error posting blog:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full relative space-y-4">
        <div className="overflow-y-auto max-h-96">
          <h1 className="text-center text-2xl font-bold mb-8">Add New Blog</h1>
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-sm"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 bg-white p-5">
            <Input
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
            />
            <Input
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Travel, Coding"
            />
            <Input
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image URL"
            />
            <Input
              label="Short Summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="1-2 line summary of blog"
            />
            <Input
              label="Tags (comma separated)"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g. react, javascript"
            />
            <Input
              label="Reading Time (e.g. 3 min)"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              placeholder="e.g. 2 min read"
            />

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Write blog content here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
                required
              ></textarea>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="bg-orange-600 text-white px-6 py-3 rounded-md font-semibold shadow-md hover:bg-orange-700 transition"
            >
              Submit Blog
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
