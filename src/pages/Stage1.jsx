import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StateMangerContext } from "../context/StateContext";
import { useNavigationLock } from "../hooks/useNavigationLock";

function Stage1() {
  const navigate = useNavigate();
  const { formData, setFormData, setStageCompleted } = useContext(StateMangerContext);

  useNavigationLock(true);

  function handleNext() {
    if (!formData.role) {
      alert("Please select a role");
      return;
    }
    setStageCompleted((p) => ({ ...p, stage1: true }));
    navigate("/register/stage-2");
  }

  return (
    <div className="w-full flex justify-center mt-8">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold">Stage 1 / 3: Role Selection</h1>

        <div className="mt-6 flex flex-col gap-2">
          <label className="font-medium">Role</label>

          <select
            value={formData.role}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                role: e.target.value,
              }));
            }}
            className="border border-gray-300 rounded-lg px-4 py-3 w-full"
          >
            <option value="">Select role</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Professor">Professor</option>
          </select>
        </div>

        <button
          onClick={handleNext}
          disabled={!formData.role}
          className={`mt-8 w-full py-3 rounded-lg transition
            ${
              formData.role
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Stage1;