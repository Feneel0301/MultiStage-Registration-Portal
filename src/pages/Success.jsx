import { useContext, useState, useEffect } from "react";
import { StateMangerContext } from "../context/StateContext";

function Success() {
  const { formData } = useContext(StateMangerContext);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // 🔒 Permanently lock backward navigation
    window.history.pushState(null, '', window.location.href);

    const handlePopState = (e) => {
      // Always prevent going back to registration stages
      window.history.pushState(null, '', window.location.href);
      alert('Registration is complete. You cannot go back to previous stages.');
    };

    window.addEventListener('popstate', handlePopState);

    // Show welcome screen after 5 seconds
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {!showWelcome ? (
        // Registration Success Screen
        <div className="flex justify-center mt-12">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
              Registration Successful!
            </h1>

            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Role:</span> {formData.role}
              </p>

              {/* Student specific fields */}
              {formData.role === "Student" && (
                <>
                  <p>
                    <span className="font-semibold">School:</span>{" "}
                    {formData.school}
                  </p>
                  <p>
                    <span className="font-semibold">Grade:</span> {formData.grade}
                  </p>
                </>
              )}

              {/* Teacher specific fields */}
              {formData.role === "Teacher" && (
                <>
                  <p>
                    <span className="font-semibold">Subject:</span>{" "}
                    {formData.subject}
                  </p>
                  <p>
                    <span className="font-semibold">Years of Experience:</span>{" "}
                    {formData.experience}
                  </p>
                </>
              )}

              {/* Professor specific fields */}
              {formData.role === "Professor" && (
                <>
                  <p>
                    <span className="font-semibold">Department:</span>{" "}
                    {formData.department}
                  </p>
                  <p>
                    <span className="font-semibold">Research Area:</span>{" "}
                    {formData.research}
                  </p>
                </>
              )}

              {/* Common fields for all roles */}
              <p>
                <span className="font-semibold">Email:</span> {formData.email}
              </p>
              <p>
                <span className="font-semibold">Agreement Accepted:</span>{" "}
                {formData.agreement ? "Yes" : "No"}
              </p>
            </div>

            <p className="text-center text-sm text-gray-500 mt-6">
              Please wait while we prepare your dashboard...
            </p>
          </div>
        </div>
      ) : (
        // Welcome Screen - Clean centered layout
        <div className="flex flex-col items-center justify-center  fade-in">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Welcome, {formData.role}.
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Your registration is complete.
            </p>
            
            <a  href="/"
              className="text-blue-500 hover:text-blue-600 text-lg font-medium underline"
            >
              Go to Dashboard Home
            </a>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .fade-in {
          animation: fadeIn 0.8s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Success;