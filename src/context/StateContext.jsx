import { createContext, useState } from "react";

export const StateMangerContext = createContext();

function StateContext({ children }) {
  const [stageCompleted, setStageCompleted] = useState({
    stage1: false,
    stage2: false,
    stage3: false,
  });

  const [formData, setFormData] = useState({
    // Stage 1
    role: "",
    
    // Stage 2 - Student
    school: "",
    grade: "",
    
    // Stage 2 - Teacher
    subject: "",
    experience: "",
    
    // Stage 2 - Professor
    department: "",
    research: "",
    
    // Stage 3
    email: "",
    agreement: false,
  });

  // Calculate progress dynamically based on filled fields
  const calculateProgress = () => {
    let totalFields = 0;
    let completedFields = 0;

    // Stage 1: Role selection
    totalFields += 1;
    if (formData.role) completedFields += 1;

    // Stage 2: Role-specific fields
    if (formData.role === "Student") {
      totalFields += 2; // school, grade
      if (formData.school && formData.school.trim()) completedFields += 1;
      if (formData.grade && formData.grade.trim()) completedFields += 1;
    } else if (formData.role === "Teacher") {
      totalFields += 2; // subject, experience
      if (formData.subject && formData.subject.trim()) completedFields += 1;
      if (formData.experience && formData.experience.trim()) completedFields += 1;
    } else if (formData.role === "Professor") {
      totalFields += 2; // department, research
      if (formData.department && formData.department.trim()) completedFields += 1;
      if (formData.research && formData.research.trim()) completedFields += 1;
    }

    // Stage 3: Email and agreement (only count if role is selected)
    if (formData.role) {
      totalFields += 2;
      if (formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        completedFields += 1;
      }
      if (formData.agreement) completedFields += 1;
    }

    return totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0;
  };

  return (
    <StateMangerContext.Provider
      value={{
        stageCompleted,
        setStageCompleted,
        formData,
        setFormData,
        calculateProgress,
      }}
    >
      {children}
    </StateMangerContext.Provider>
  );
}

export default StateContext;