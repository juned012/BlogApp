import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const Error404 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md bg-white p-8 rounded-2xl shadow-xl text-center"
      >
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-orange-500" size={48} />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found.</p>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition duration-200"
        >
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Error404;
