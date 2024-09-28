import { useNavigate, useParams } from "react-router-dom";
import { useGetStudent } from "../../hooks/useGetStudent";
import Spinner from "../../ui/Spinner";
import { FaAngleLeft } from "react-icons/fa6";

export default function StudentDetails() {
  const { studentID } = useParams();
  const { student, isGettingStudent, error } = useGetStudent(studentID);
  const navigate = useNavigate();

  if (isGettingStudent) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 mt-12 mx-auto max-w-xl px-4">
        <h1 className="font-bold text-3xl text-gray-900">Student Details</h1>

        <button
          className="flex items-center gap-2 text-blue-600 hover:text-blue-500 font-bold transition-all"
          onClick={() => navigate("/")}
        >
          <FaAngleLeft className="text-xl" /> Back To Home
        </button>
        <div className="flex flex-col items-center gap-4 rounded-2xl w-full p-6 sm:w-96 border border-slate-200 bg-white shadow-lg">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl w-full m-4 p-6 sm:w-96 border border-red-300 bg-red-50 text-red-600 mx-auto max-h-[32rem] overflow-auto shadow-lg">
        <p className="text-center text-xl font-bold">No data available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-12 mx-auto max-w-xl px-4">
      <h1 className="font-bold text-3xl text-gray-900">Student Details</h1>

      <button
        className="flex items-center gap-2 text-blue-600 hover:text-blue-500 font-bold transition-all"
        onClick={() => navigate("/")}
      >
        <FaAngleLeft className="text-xl" /> Back To Home
      </button>

      <div className="flex flex-col items-start gap-4 rounded-2xl w-full p-6 sm:w-96 border border-slate-200 bg-white shadow-lg">
        <p className="text-lg">
          <span className="font-bold text-gray-900">Name: </span>
          {student?.name}
        </p>
        <p className="text-lg">
          <span className="font-bold text-gray-900">Email: </span>
          {student?.email}
        </p>
        <p className="text-lg">
          <span className="font-bold text-gray-900">Age: </span>
          {student?.age}
        </p>
        <p className="text-lg">
          <span className="font-bold text-gray-900">Education Level: </span>
          {student?.education_level}
        </p>
        <p className="text-lg">
          <span className="font-bold text-gray-900">Nationality: </span>
          {student?.nationality}
        </p>
        <p className="text-lg">
          <span className="font-bold text-gray-900">National ID: </span>
          {student?.national_id}
        </p>
      </div>
    </div>
  );
}
