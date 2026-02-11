import { useState, useEffect, useContext } from "react";
import { StateMangerContext } from "../../context/StateContext";

function StudentForm({ onValidityChange, onSubmit }) {
  const { formData, setFormData } = useContext(StateMangerContext);
  
  const [localData, setLocalData] = useState({
    school: formData.school || "",
    grade: formData.grade || "",
  });

  const [errors, setErrors] = useState({
    school: "",
    grade: "",
  });

  // Update context whenever local data changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      school: localData.school,
      grade: localData.grade,
    }));
  }, [localData, setFormData]);

  // Validate form
  useEffect(() => {
    const isValid =
      localData.school.trim() !== "" &&
      localData.grade.trim() !== "" &&
      !errors.grade &&
      !errors.school;
    onValidityChange(isValid);
  }, [localData, errors, onValidityChange]);

  function validateGrade(value) {
    if (value === "") {
      return "";
    }
    
    const numValue = parseInt(value);
    
    if (isNaN(numValue)) {
      return "Grade must be a number";
    }
    
    if (numValue < 1 || numValue > 12) {
      return "Grade must be between 1 and 12";
    }
    
    return "";
  }

  function handleChange(e) {
    const { name, value } = e.target;
    
    if (name === "grade") {
      // Only allow numbers
      if (value !== "" && !/^\d+$/.test(value)) {
        return;
      }
      
      const error = validateGrade(value);
      setErrors((prev) => ({ ...prev, grade: error }));
    }
    
    setLocalData({
      ...localData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    onSubmit(e, localData);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium">School Name</label>
          <input
            type="text"
            name="school"
            value={localData.school}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full"
            placeholder="Enter school name"
          />
          {errors.school && (
            <span className="text-red-500 text-sm">{errors.school}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Grade (1-12)</label>
          <input
            type="text"
            name="grade"
            value={localData.grade}
            onChange={handleChange}
            className={`border rounded-lg px-4 py-3 w-full ${
              errors.grade ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter grade (1-12)"
          />
          {errors.grade && (
            <span className="text-red-500 text-sm">{errors.grade}</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!localData.school || !localData.grade || errors.grade}
        className={`mt-8 w-full py-3 rounded-lg transition
          ${
            localData.school && localData.grade && !errors.grade
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        Next
      </button>
    </form>
  );
}

export default StudentForm;