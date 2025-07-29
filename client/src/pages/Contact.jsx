import { motion } from "framer-motion";

const Contact = () => {
  return (
    <motion.section
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-5xl mx-auto min-h-screen mt-10 px-4 text-center"
    >
      <h1 className="text-center text-2xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-10">
        We'd love to hear from you! Whether it's feedback, a question, or a
        collaboration idea — just drop us a message below.
      </p>

      <form className="grid gap-6 text-left max-w-xl m-auto p-10 border-2 border-gray-200 rounded-md">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Message
          </label>
          <textarea
            rows="5"
            placeholder="Your message..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="submit"
          className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition"
        >
          Send Message
        </motion.button>
      </form>
    </motion.section>
  );
};

export default Contact;
