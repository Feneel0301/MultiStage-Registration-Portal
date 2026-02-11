import React from "react";

export default function ProfessorStage3Form({
  email,
  agreement,
  onChange,
  onSubmit,
  emailRef,
  isFormValid,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 mt-6">
      <div>
        <label className="block font-medium mb-2">Email</label>
        <input
          ref={emailRef}
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          className="w-full h-12 px-4 rounded-lg border"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="agreement"
          checked={agreement}
          onChange={onChange}
        />
        <label className="text-sm">I agree to the terms and conditions</label>
      </div>

      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full h-12 rounded-lg font-semibold transition
                ${
                  isFormValid
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
      >
        Submit
      </button>
    </form>
  );
}
