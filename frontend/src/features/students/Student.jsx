import { MdDelete, MdEdit } from "react-icons/md";
import { useDeleteStudent } from "../../hooks/useDeleteStudent";
import { useNavigate } from "react-router-dom";
import Spinner from "../../ui/Spinner";

export default function Student({ studentData = {} }) {
  const navigate = useNavigate();
  const { deleteStudent, isDeletingStudent } = useDeleteStudent();
  function handleClick() {
    navigate(`/student/${studentData.id}`);
  }

  function handleEdit(event) {
    event.stopPropagation();
    navigate(`/inputForm/${studentData.id}`);
  }

  function handleDelete(event) {
    event.stopPropagation();
    deleteStudent(studentData?.id);
  }

  return (
    <div
      onClick={handleClick}
      disabled={isDeletingStudent}
      className="w-full flex items-center gap-4 justify-between px-6 py-2 bg-slate-100 rounded-2xl cursor-pointer hover:bg-slate-200 hover:scale-[0.99] transition-all duration-300 ease-out"
    >
      <div className="flex flex-col justify-center items-start gap-y-2">
        <p className="font-bold text-lg text-gray-800">
          {studentData?.name || "No Name"}
        </p>
        <p className="font-bold text-sm text-gray-700">
          {studentData?.email || "No Email"}
        </p>
      </div>
      <div className="flex items-center gap-4 justify-center">
        <button
          onClick={handleEdit}
          disabled={isDeletingStudent}
          className="outline-none border-none flex cursor-pointer text-white items-center justify-center w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 hover:scale-[0.98] transition-all duration-200 ease-out"
        >
          <MdEdit />
        </button>
        <button
          onClick={handleDelete}
          disabled={isDeletingStudent}
          className="outline-none border-none flex cursor-pointer text-white items-center justify-center w-8 h-8 rounded-full bg-red-600 hover:bg-red-500 hover:scale-[0.98] transition-all duration-200 ease-out"
        >
          {isDeletingStudent ? <Spinner /> : <MdDelete />}
        </button>
      </div>
    </div>
  );
}
