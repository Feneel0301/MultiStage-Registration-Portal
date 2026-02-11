import { useState, useEffect, useContext } from "react";
import { StateMangerContext } from "../../context/StateContext";

function ProfessorForm({ onValidityChange, onSubmit }) {
  const { formData, setFormData } = useContext(StateMangerContext);
  
  const [localData, setLocalData] = useState({
    department: formData.department || "",
    research: formData.research || "",
  });

  // Update context whenever local data changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      department: localData.department,
      research: localData.research,
    }));
  }, [localData, setFormData]);

  // Validate form
  useEffect(() => {
    const isValid =
      localData.department.trim() !== "" &&
      localData.research.trim() !== "";
    onValidityChange(isValid);
  }, [localData, onValidityChange]);

  function handleChange(e) {
    setLocalData({
      ...localData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    onSubmit(e, localData);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="font-medium">Department</label>
          <input
            type="text"
            name="department"
            value={localData.department}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full"
            placeholder="Enter department"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">Research Area</label>
          <input
            type="text"
            name="research"
            value={localData.research}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full"
            placeholder="Enter research area"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!localData.department || !localData.research}
        className={`mt-8 w-full py-3 rounded-lg transition
          ${
            localData.department && localData.research
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        Next
      </button>
    </form>
  );
}

export default ProfessorForm;