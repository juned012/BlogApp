import { useNavigate, useParams } from "react-router-dom";
import CommentSection from "./../components/CommentSection";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import LoadingBar from "./../components/LoadingBar";
import { MoveLeft } from "lucide-react";

const BlogDetailPage = () => {
  const { id } = useParams();
  const { handleGetSingleBlogPost, singleBlog, singleBlogLoading } =
    useContext(UserContext);

  useEffect(() => {
    handleGetSingleBlogPost(id);
  }, []);

  const blog = singleBlog;
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      <div
        onClick={() => navigate(-1)}
        className="text-sm mb-8 text-orange-500 hover:text-orange-600 cursor-pointer inline-block"
      >
        <div className="flex items-center gap-2">
          <MoveLeft />
          <span>Back to home</span>
        </div>
      </div>
      {singleBlogLoading ? (
        <LoadingBar />
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            By {blog.author?.fullName || "Unknown"} • {blog.readTime} •{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <p className="text-lg text-gray-700 whitespace-pre-line">
            {blog.description}
          </p>

          <div className="flex gap-2 mt-10 flex-wrap">
            {blog.tags?.[0]?.split(",").map((tag, index) => (
              <span
                key={index}
                className="bg-orange-400 text-white px-2 py-1 rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="w-full h-[1px] bg-gray-200 rounded-md my-10"></div>

          <CommentSection postId={id} />
        </>
      )}
    </div>
  );
};

export default BlogDetailPage;
