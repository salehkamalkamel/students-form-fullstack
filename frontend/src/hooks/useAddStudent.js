import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAddStudent } from "../services/apiAddStudent";

function useAddStudent() {
  const queryClient = useQueryClient();
  const {
    mutate: addStudent,
    isPending: isAddingStudent,
    error,
  } = useMutation({
    mutationFn: (studentData) => apiAddStudent(studentData),
    onSuccess: () => queryClient.invalidateQueries(["students"]),
  });
  return { addStudent, isAddingStudent, error };
}

export { useAddStudent };
