import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FormPage from "./pages/FormPage";
import StudentDetails from "./features/students/StudentDetails";
export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/inputForm/:studentID?" element={<FormPage />} />
      <Route path="/student/:studentID" element={<StudentDetails />} />
    </Routes>
  );
}
