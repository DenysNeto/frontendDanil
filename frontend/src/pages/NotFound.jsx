import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import NavSide from "../components/ui/NavSide.jsx";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
    <NavSide/>


      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>

      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        <IoMdArrowRoundBack size={20} />
        <span className="text-sm font-medium">BACK</span>
      </button>
    </div>
  );
}