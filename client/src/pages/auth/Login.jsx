// Login.js
import { Eye, EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const { handleUserLogin } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const success = await handleUserLogin(formData);
    if (success) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.role) {
        // fallback page if user object/role is missing
        navigate("/default-page");
      } else if (user.role === "reader") {
        navigate("/");
      } else if (user.role === "author") {
        navigate("/author-dashboard");
      } else if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        // fallback, choose a default page
        navigate("/default-page");
      }
    } else {
      // Optionally: show error feedback
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-orange-500">Welcome Back</h1>
          <p className="text-sm text-gray-600 mt-1">Login to your account</p>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-4">
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
              required
              value={formData.email}
              onChange={handleInputChanges}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="you@example.com"
            />
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
                required
                value={formData.password}
                onChange={handleInputChanges}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 pr-10"
                placeholder="Enter your password"
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
            Login
          </button>
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?
            <Link
              to="/signup"
              className="text-orange-500 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
