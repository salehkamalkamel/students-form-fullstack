import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUpdateStudent } from "../services/apiUpdateStudent";

function useUpdateStudent() {
  const queryClient = useQueryClient();
  const {
    mutate: updateStudent,
    isPending: isUpdatingStudent,
    error,
  } = useMutation({
    mutationFn: ({ studentID, updatedData }) =>
      apiUpdateStudent(studentID, updatedData),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(["students"]);
    },
  });

  return { updateStudent, isUpdatingStudent, error };
}

export { useUpdateStudent };
