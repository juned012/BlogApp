import { ClipLoader } from "react-spinners";

const LoadingBar = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <ClipLoader color="#f97316" size={40} speedMultiplier={2} />
    </div>
  );
};

export default LoadingBar;
