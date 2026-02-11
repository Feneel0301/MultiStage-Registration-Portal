import { useState, useEffect, useContext } from "react";
import { StateMangerContext } from "../../context/StateContext";

function TeacherForm({ onValidityChange, onSubmit }) {
  const { formData, setFormData } = useContext(StateMangerContext);
  
  const [localData, setLocalData] = useState({
    subject: formData.subject || "",
    experience: formData.experience || "",
  });

  const [errors, setErrors] = useState({
    subject: "",
    experience: "",
  });

  // Update context whenever local data changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      subject: localData.subject,
      experience: localData.experience,
    }));
  }, [localData, setFormData]);

  // Validate form
  useEffect(() => {
    const isValid =
      localData.subject.trim() !== "" &&
      localData.experience.trim() !== "" &&
      !errors.subject &&
      !errors.experience;
    onValidityChange(isValid);
  }, [localData, errors, onValidityChange]);

  function validateExperience(value) {
    if (value === "") {
      return "";
    }
    
    const numValue = parseInt(value);
    
    if (isNaN(numValue)) {
      return "Experience must be a number";
    }
    
    if (numValue < 0) {
      return "Experience cannot be negative";
    }
    
    if (numValue > 40) {
      return "Experience cannot exceed 40 years";
    }
    
    return "";
  }

  function handleChange(e) {
    const { name, value } = e.target;
    
    if (name === "experience") {
      // Only allow numbers
      if (value !== "" && !/^\d+$/.test(value)) {
        return;
      }
      
      const error = validateExperience(value);
      setErrors((prev) => ({ ...prev, experience: error }));
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
          <label className="font-medium">Subject</label>
          <input
            type="text"
            name="subject"
            value={localData.subject}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full"
            placeholder="Enter subject"
          />
          {errors.subject && (
            <span className="text-red-500 text-sm">{errors.subject}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Years of Experience (0-40)</label>
          <input
            type="text"
            name="experience"
            value={localData.experience}
            onChange={handleChange}
            className={`border rounded-lg px-4 py-3 w-full ${
              errors.experience ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter years of experience"
          />
          {errors.experience && (
            <span className="text-red-500 text-sm">{errors.experience}</span>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={!localData.subject || !localData.experience || errors.experience}
        className={`mt-8 w-full py-3 rounded-lg transition
          ${
            localData.subject && localData.experience && !errors.experience
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        Next
      </button>
    </form>
  );
}

export default TeacherForm;