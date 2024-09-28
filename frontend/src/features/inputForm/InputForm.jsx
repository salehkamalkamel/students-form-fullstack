import { validateEmail } from "../../helpers/helpers";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner"; // Assuming you have a Spinner component
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useGetStudent } from "../../hooks/useGetStudent";
import { useUpdateStudent } from "../../hooks/useUpdateStudent";
import { useAddStudent } from "../../hooks/useAddStudent";
import SkeletonInputForm from "./SkeletonInputForm";

// Age validation function
const validateAge = (value) => {
  const numericAge = Number(value);
  if (isNaN(numericAge)) {
    return "Age must be a number";
  } else if (numericAge < 6) {
    return "Age must be 6 or more";
  } else if (numericAge > 22) {
    return "Age must be less than or equal to 22";
  }
  return true;
};

export default function InputForm() {
  const { studentID } = useParams();
  const { student, isGettingStudent } = useGetStudent(studentID || "");
  const { updateStudent, isUpdatingStudent } = useUpdateStudent();
  const { addStudent, isAddingStudent } = useAddStudent();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const age = watch("age");

  // Populate form if editing an existing student
  useEffect(() => {
    if (studentID && student) {
      // Populate form fields with existing student data
      setValue("name", student.name);
      setValue("email", student.email);
      setValue("age", student.age);
      setValue("education_level", student.education_level);
      setValue("nationality", student.nationality);
      setValue("national_id", student.national_id);
    }
  }, [student, studentID, setValue]);

  // Define education level options based on age
  const getEducationLevels = (age) => {
    const numericAge = Number(age);
    if (numericAge >= 6 && numericAge <= 10) {
      return ["Elementary School"];
    } else if (numericAge >= 11 && numericAge <= 16) {
      return ["Middle School", "High School"];
    } else if (numericAge > 16 && numericAge <= 22) {
      return ["High School", "Bachelor's Degree", "Master's Degree"];
    } else {
      return [];
    }
  };

  const educationLevels = getEducationLevels(age);

  // Education level validation function
  const validateEducationLevel = (value) => {
    if (!value) {
      return "Education Level is required";
    }
    if (!educationLevels.includes(value)) {
      return `Invalid education level for age ${age}`;
    }
    return true;
  };

  const onSubmit = (data) => {
    if (!data.national_id) {
      data = { ...data, national_id: 0 };
    }
    if (studentID) {
      setMessage("Updateing Student...");
      updateStudent(
        { studentID, updatedData: data },
        {
          onSuccess: () => setMessage("Student Updated."),
        }
      );
    } else {
      setMessage("Adding New Student...");
      addStudent(data, {
        onSuccess: () => setMessage("New Student Added."),
      });
    }
  };

  if (isGettingStudent) return <SkeletonInputForm studentID={studentID} />;

  return (
    <div className="flex flex-col items-center justify-center gap-4 max-[40rem] mx-auto mt-12">
      <h1 className="font-bold text-[2rem] text-gray-900">
        {studentID ? "Edit Student" : "Add Student"}
      </h1>
      <button
        className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-500 font-bold"
        onClick={() => navigate("/")}
      >
        <FaAngleLeft /> Back To Home
      </button>
      <form
        className="flex flex-col items-center justify-center gap-4  border rounded-2xl p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Name and Email Fields */}
        <div className="flex flex-col items-start sm:flex-row gap-8 justify-between sm:items-center">
          <Input
            heading="Name"
            holder="Enter Your Name"
            {...register("name", { required: "This field is required" })}
            error={errors?.name?.message}
          />
          <Input
            heading="Email"
            holder="Enter Your Email"
            {...register("email", {
              required: "This field is required",
              validate: validateEmail,
            })}
            error={errors?.email?.message}
          />
        </div>

        {/* Age and Education Level Fields */}
        <div className="flex flex-col items-start sm:flex-row gap-8 justify-between sm:items-center">
          <Input
            heading="Age"
            holder="Enter Your Age"
            type="number"
            {...register("age", {
              required: "This field is required",
              validate: validateAge,
            })}
            error={errors?.age?.message}
          />
          {/* Education level*/}
          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium">Education Level</label>
            <select
              className={`font-medium px-4 py-2 text-[1rem] outline-0 border-2 ${
                errors.educationLevel ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              {...register("education_level", {
                required: "Education Level is required",
                validate: validateEducationLevel,
              })}
            >
              <option value="">Select Education Level</option>
              {educationLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            {errors.education_level && (
              <span className="text-red-500 text-sm mt-1">
                {errors.education_level.message}
              </span>
            )}
          </div>
        </div>

        {/* Nationality and National ID Fields */}
        <div className="flex flex-col items-start sm:flex-row gap-8 justify-between sm:items-center">
          <Input
            heading="Nationality"
            holder="Enter Your Nationality"
            {...register("nationality", {
              required: "This field is required",
            })}
            error={errors?.nationality?.message}
          />
          {age > 16 && (
            <Input
              heading="National ID"
              type="number"
              holder="Enter Your National ID"
              {...register("national_id", {
                required: "National ID is required for age over 16",
              })}
              error={errors?.national_id?.message}
            />
          )}
        </div>

        {message && (
          <p className="font-medium text-sm text-gray-800 text-center">
            {message}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-y-2 gap-x-6 sm:flex-row w-full">
          <Button type="submit" disabled={isAddingStudent || isUpdatingStudent}>
            {isAddingStudent || isUpdatingStudent ? (
              <Spinner />
            ) : studentID ? (
              "Update"
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
