import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function SkeletonInputForm({ studentID }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center gap-6 max-w-[40rem] mx-auto mt-12 px-4">
      <h1 className="font-bold text-2xl md:text-3xl text-gray-900">
        {studentID ? "Edit Student" : "Add Student"}
      </h1>

      <button
        className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-500 font-bold"
        onClick={() => navigate("/")}
      >
        <FaAngleLeft /> Back To Home
      </button>

      <div className="w-full border rounded-2xl p-8 flex flex-col gap-6 animate-pulse">
        {/* Row 1 */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
          <div className="flex flex-col gap-2 w-full">
            <div className="h-6 w-24 bg-slate-200 rounded-xl"></div>
            <div className="h-12 w-full bg-slate-200 rounded-xl"></div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="h-6 w-24 bg-slate-200 rounded-xl"></div>
            <div className="h-12 w-full bg-slate-200 rounded-xl"></div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
          <div className="flex flex-col gap-2 w-full">
            <div className="h-6 w-24 bg-slate-200 rounded-xl"></div>
            <div className="h-12 w-full bg-slate-200 rounded-xl"></div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="h-6 w-24 bg-slate-200 rounded-xl"></div>
            <div className="h-12 w-full bg-slate-200 rounded-xl"></div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6">
          <div className="flex flex-col gap-2 w-full">
            <div className="h-6 w-24 bg-slate-200 rounded-xl"></div>
            <div className="h-12 w-full bg-slate-200 rounded-xl"></div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="h-6 w-24 bg-slate-200 rounded-xl"></div>
            <div className="h-12 w-full bg-slate-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
