import { motion } from "framer-motion";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./../context/UserContext";
const HeroSection = () => {
  const { user } = useContext(UserContext);
  return (
    <motion.section
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-5xl mx-auto mt-10 min-h-56 bg-gradient-to-br
        from-orange-400 via-white to-purple-500 rounded-3xl
        flex justify-center items-center text-center 
        shadow-xl px-4 sm:px-8 md:px-16 py-16"
    >
      <div className="w-full sm:w-[600px]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-md">
          Hi, Welcome Back! <br />
          {user && user.fullName}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-gray-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          perspiciatis laudantium dolores numquam quis ipsa unde tenetur ipsam
          dolorem ullam ea ad excepturi rerum earum beatae, iure ab aliquam
          corrupti?
        </p>

        {user ? (
          ""
        ) : (
          <Link to={"/signup"}>
            <button className="px-6 py-3 cursor-pointer text-sm bg-white rounded-md text-black mt-6 shadow-md hover:shadow-lg transition">
              Get Started
            </button>
          </Link>
        )}
      </div>
    </motion.section>
  );
};

export default HeroSection;
