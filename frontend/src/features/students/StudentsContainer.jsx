import { useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import Student from "./Student";

export default function StudentsContainer({
  studentsArray = [],
  loading = false,
  error = null,
}) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query")?.toLowerCase() || "";

  const filteredStudents = studentsArray.filter((student) =>
    student.name.toLowerCase().includes(query)
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl w-full m-4 p-4 sm:w-96 border border-slate-200 mx-auto">
        <Spinner />
      </div>
    );
  }
  if (error || filteredStudents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl w-full m-4 p-4 sm:w-96 border border-slate-200 mx-auto">
        <p className="text-center text-xl font-bold text-gray-800">
          No data available.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl w-full m-4 p-4 sm:w-96 border border-slate-200 mx-auto max-h-[32rem] overflow-auto">
      {filteredStudents.map((student) => (
        <Student studentData={student} key={student.id} />
      ))}
    </div>
  );
}
