import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import SearchForm from "./SearchForm";
import StudentsContainer from "./StudentsContainer";
import { useGetStudents } from "../../hooks/useGetStudents";

export default function StudentsLayout() {
  const navigate = useNavigate();
  const { students, gettingStudents, error } = useGetStudents();

  return (
    <div className="w-fit mx-auto flex flex-col items-center justify-center gap-y-2 mt-8 p-4">
      <SearchForm />
      <StudentsContainer
        studentsArray={students}
        loading={gettingStudents}
        error={error}
      />
      <Button onClick={() => navigate(`/inputForm`)} shape="secBtn">
        Add student
      </Button>
    </div>
  );
}
