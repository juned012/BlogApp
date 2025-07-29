import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Card from "./Card";

const CardListing = () => {
  const { handleGetAllBlogs, allBlogPosts = [] } = useContext(UserContext);

  useEffect(() => {
    handleGetAllBlogs();
  }, []);

  return (
    <div className="max-w-5xl m-auto my-8 px-4">
      <h1 className="text-center text-2xl font-bold my-10">Latest Blog</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {allBlogPosts.length === 0 ? (
          <p className="col-span-full text-center">No blogs!</p>
        ) : (
          allBlogPosts.map((blog) => (
            <Card key={blog._id || blog.id} blog={blog} />
          ))
        )}
      </div>
    </div>
  );
};

export default CardListing;
