import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [authorPosts, setAuthorPosts] = useState([]);
  const [allBlogPosts, setAllBlogPosts] = useState([]);
  const [singleBlog, setSingleBlog] = useState(null);
  const [singleBlogLoading, setSingleBlogLoading] = useState(true);
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const handleUserSignup = async (formData) => {
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const { user, token } = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      setUser(user);
      setToken(token);
      return true;
    } catch (error) {
      console.error(
        "Signup failed:",
        error.response?.data?.message || error.message
      );
      return false;
    }
  };

  const handleUserLogin = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        formData
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setToken(token);
      console.log("Login successful");
      return true;
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      return false;
    }
  };

  const logoutUser = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const handlePostBlogByUser = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/post-blog`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newPost = response.data;

      setAuthorPosts((prevPosts) => [newPost, ...prevPosts]);

      return newPost;
    } catch (error) {
      console.error(
        "Error posting blog:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleGetPostOfAuthor = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/get-blog`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAuthorPosts(response.data.posts);
    } catch (error) {
      console.error(
        "Error fetching user's blog posts:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleDeletePostAuthor = async (postId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/delete-blog/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAuthorPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== postId)
      );

      console.log("Blog deleted successfully.");
    } catch (error) {
      console.error(
        "Failed to delete blog:",
        error.response?.data || error.message
      );
    }
  };

  const handleGetAllBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/all-blog`
      );
      const allBlogs = response.data.posts || [];
      setAllBlogPosts(allBlogs);
      return allBlogs;
    } catch (error) {
      console.error(
        "Error fetching all blogs:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleGetSingleBlogPost = async (postId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blog/all-blog/${postId}`
      );
      const blog = response.data.blog;
      setSingleBlog(blog);
      setSingleBlogLoading(false);
      return blog;
    } catch (error) {
      console.error(
        "Error fetching single blog post:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleCommentPost = async (postId, formData) => {
    try {
      const res = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/comment/${postId}/post-comment`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log(
        "Error posting comment:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleGetComments = async (postId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/comment/${postId}/comments`
      );

      setAllComments(res.data.comments);
      return res.data.comments;
    } catch (error) {
      console.log("Error fetching comments:", error.message);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        handleUserSignup,
        handleUserLogin,
        logoutUser,
        loading,
        handlePostBlogByUser,
        handleGetPostOfAuthor,
        authorPosts,
        handleDeletePostAuthor,
        handleGetAllBlogs,
        allBlogPosts,
        handleGetSingleBlogPost,
        singleBlog,
        singleBlogLoading,
        handleCommentPost,
        handleGetComments,
        allComments,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
