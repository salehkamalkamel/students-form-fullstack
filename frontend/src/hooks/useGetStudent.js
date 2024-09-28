import { useQuery } from "@tanstack/react-query";
import { apiGetStudent } from "../services/apiGetStudent";

function useGetStudent(studentID) {
  const {
    data: student,
    isLoading: isGettingStudent,
    error,
  } = useQuery({
    queryKey: ["student"],
    queryFn: () => apiGetStudent(studentID),
    enabled: Boolean(studentID),
  });

  return { student, isGettingStudent, error };
}

export { useGetStudent };
