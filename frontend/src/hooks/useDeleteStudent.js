import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiDeleteStudent } from "../services/apiDeleteStudent";

function useDeleteStudent() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteStudent,
    isPending: isDeletingStudent,
    error,
  } = useMutation({
    mutationFn: (studentID) => apiDeleteStudent(studentID),
    onSuccess: () => queryClient.invalidateQueries(["students"]),
  });

  return { deleteStudent, isDeletingStudent, error };
}

export { useDeleteStudent };
