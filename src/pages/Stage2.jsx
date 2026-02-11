import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/forms/StudentForm";
import TeacherForm from "../components/forms/TeacherForm";
import ProfessorForm from "../components/forms/ProfessorForm";
import { StateMangerContext } from "../context/StateContext";
import { useNavigationLock } from "../hooks/useNavigationLock";

function Stage2() {
  const navigate = useNavigate();
  const { formData, setFormData, setStageCompleted } = useContext(StateMangerContext);
  const [isValid, setIsValid] = useState(false);

  useNavigationLock(true);

  function handleFormValidity(valid) {
    setIsValid(valid);
  }

  function handleSubmit(e, data) {
    e.preventDefault();
    if (isValid) {
      // Data is already in context, just navigate
      setStageCompleted((p) => ({ ...p, stage2: true }));
      navigate("/register/stage-3");
    }
  }

  return (
    <div className="w-full flex justify-center mt-12">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold">
          Stage 2 / 3: Role Specific Details
        </h1>

        <p className="mt-4 text-gray-600">
          Selected Role: <strong>{formData.role}</strong>
        </p>
        {formData.role === "Student" && (
          <StudentForm
            onValidityChange={handleFormValidity}
            onSubmit={handleSubmit}
          />
        )}
        {formData.role === "Teacher" && (
          <TeacherForm
            onValidityChange={handleFormValidity}
            onSubmit={handleSubmit}
          />
        )}
        {formData.role === "Professor" && (
          <ProfessorForm
            onValidityChange={handleFormValidity}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default Stage2;