import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import DefaultImg from "../../assets/default-img.webp";
import { UserContext } from "../../context/UserContext";

const Signup = () => {
  const { handleUserSignup } = useContext(UserContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
    bio: "",
    role: "reader",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(DefaultImg);
  const navigate = useNavigate();

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const success = await handleUserSignup(formData);
    if (success) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role === "reader") {
        navigate("/");
      } else if (user?.role === "author") {
        navigate("/author-dashboard");
      } else if (user?.role === "admin") {
        navigate("/admin-dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-orange-500">Create Account</h1>
          <p className="text-sm text-gray-600 mt-1">
            Join us by creating your account
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div className="text-center">
            <label htmlFor="avatar" className="cursor-pointer inline-block">
              <div className="w-24 h-24 mx-auto rounded-full border-2 border-dashed border-orange-400 flex items-center justify-center overflow-hidden hover:opacity-80 transition">
                <img
                  src={avatarPreview}
                  alt="Avatar Preview"
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2 hover:underline">
                Upload Profile Image
              </p>
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="name"
              value={formData.fullName}
              onChange={handleInputChanges}
              required
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label
              htmlFor="bio"
              className="block font-medium text-gray-700 mb-1"
            >
              Bio
            </label>
            <input
              type="text"
              name="bio"
              id="bio"
              value={formData.bio}
              onChange={handleInputChanges}
              required
              placeholder="Add bio"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChanges}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block font-medium text-gray-700 mb-1"
            >
              Select Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleInputChanges}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white text-gray-700"
            >
              <option value="reader">Reader</option>
              <option value="author">Author</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleInputChanges}
                required
                placeholder="Choose a strong password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-orange-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
