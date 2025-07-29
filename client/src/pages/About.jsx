import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.section
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-5xl min-h-screen mx-auto mt-10 px-4 text-center"
    >
      <h1 className="text-center text-2xl font-bold mb-4">About Us</h1>
      <p className="text-gray-900 font-semibold text-2xl mb-1 leading-relaxed">
        Welcome to our platform! 🚀
      </p>
      <p>
        We’re passionate about sharing insightful blogs, creative content, and
        inspiring stories. Our mission is to empower readers with knowledge,
        trends, and tutorials across various domains.
        <br />
        Whether you're a beginner or an expert, we’re here to guide you,
        entertain you, and grow together.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-8 text-left">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-6 bg-orange-100 rounded-xl shadow-md"
        >
          <h3 className="text-xl font-semibold mb-2 text-orange-600">
            What We Do
          </h3>
          <p>
            We publish high-quality content including tutorials, guides,
            developer blogs, design insights, and everything in between.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-6 bg-purple-100 rounded-xl shadow-md"
        >
          <h3 className="text-xl font-semibold mb-2 text-purple-600">
            Our Vision
          </h3>
          <p>
            To become a go-to destination for learners, creators, and developers
            to explore, share, and grow in their careers and creativity.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
