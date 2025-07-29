import { MessageCircle, Send } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const CommentSection = ({ postId }) => {
  const [formData, setFormData] = useState({ content: "" });
  const { handleCommentPost, handleGetComments, allComments } =
    useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (postId) {
      handleGetComments(postId);
    }
  }, [postId, handleGetComments]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await handleCommentPost(postId, formData);
      setFormData({ content: "" });
      await handleGetComments(postId);
    } catch (error) {
      setErrorMsg("Failed to post comment.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-5xl mx-auto mt-10">
      <p className="flex items-center text-lg font-semibold text-gray-700 mb-3">
        <MessageCircle className="mr-2 text-orange-500" /> Leave a Comment
      </p>
      <form onSubmit={handleSubmitForm}>
        <div className="flex items-center gap-2">
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleInput}
            id="content"
            placeholder="Write your comment..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full transition-all duration-300"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
      {errorMsg && <div className="text-red-500 mt-2">{errorMsg}</div>}

      <div className="mt-6">
        {allComments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          allComments.map((comment) => (
            <div key={comment._id} className="border-b border-gray-200 py-3">
              <p className="text-gray-800">{comment.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                — {comment.author?.fullName || "Anonymous"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
