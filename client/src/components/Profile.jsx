import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { X } from "lucide-react";

const Profile = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const avatarURL = user?.avatar
    ? `http://localhost:5000/uploads/${user.avatar}`
    : "/defaultImg.png";

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center relative space-y-1">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <img
          src={avatarURL}
          alt="avatar"
          className="w-24 h-24 mx-auto rounded-full object-cover border"
        />
        <h2 className="text-xl font-semibold text-gray-800">
          {user?.fullName}
        </h2>
        <p className="text-gray-600 text-sm">{user?.email}</p>
        <p className="text-gray-500 text-[16px]">Role: {user?.role}</p>
        <p className="text-gray-500 text-[14px]">Role: {user?.bio}</p>
      </div>
    </div>
  );
};

export default Profile;
