import { Link } from "react-router-dom";

const Card = ({ blog }) => {
  return (
    <div className="shadow-md rounded-md rounded-t-2xl overflow-hidden bg-white">
      <img
        src={blog.image}
        alt="blog image"
        className="w-full h-40 object-cover rounded-t-2xl"
      />

      <div className="p-5">
        <div className="flex items-center justify-between text-gray-800 italic text-sm">
          <p>{blog.author?.fullName}</p>
          <p>{blog.readTime}</p>
        </div>

        <h1 className="text-xl font-semibold text-orange-500 cursor-pointer mt-2">
          <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
        </h1>

        <p className="mt-1 text-sm text-gray-700">
          {blog.description?.slice(0, 100)}...
        </p>

        <div className="flex gap-2 mt-2 flex-wrap">
          {blog.tags?.[0]?.split(",").map((tag, index) => (
            <span
              key={index}
              className="bg-orange-400 text-white px-2 py-1 rounded-md text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
