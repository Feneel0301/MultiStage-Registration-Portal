import React, { Component, createRef } from "react";
import { Navigate } from "react-router-dom";
import { StateMangerContext } from "../context/StateContext";
import StudentStage3Form from "../components/forms/StudentStage3Form";
import TeacherStage3Form from "../components/forms/TeacherStage3Form";
import ProfessorStage3Form from "../components/forms/ProfessorStage3Form";

class Stage3 extends Component {
  static contextType = StateMangerContext;
  
  constructor(props) {
    super(props);

    this.state = {
      isSubmitted: false,
    };

    this.emailRef = createRef();
  }

  componentDidMount() {
    window.history.pushState(null, '', window.location.href);

    this.handlePopState = (e) => {
      window.history.pushState(null, '', window.location.href);
      alert('Please use the Submit button to complete registration');
    };

    this.handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('popstate', this.handlePopState);
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }

  isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newVal = type === "checkbox" ? checked : value;

    // Update context
    this.context.setFormData((prev) => ({
      ...prev,
      [name]: newVal,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, agreement } = this.context.formData;
    
    if (!this.isEmailValid(email) || !agreement) {
      this.emailRef.current?.focus();
      return;
    }

    this.context.setStageCompleted((prev) => ({
      ...prev,
      stage3: true,
    }));

    this.setState({ isSubmitted: true });
  };

  render() {
    const { isSubmitted } = this.state;
    const { email, agreement } = this.context.formData;

    if (isSubmitted) {
      return <Navigate to="/register/success" />;
    }

    const isFormValid = this.isEmailValid(email) && agreement === true;

    return (
      <div className="w-full flex justify-center mt-12">
        <div className="w-full max-w-2xl">
          <h1 className="text-2xl font-semibold">
            Stage 3 / 3: Additional Information
          </h1>

          {this.context.formData.role === "Student" && (
            <StudentStage3Form
              email={email}
              agreement={agreement}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              emailRef={this.emailRef}
              isFormValid={isFormValid}
            />
          )}
          {this.context.formData.role === "Teacher" && (
            <TeacherStage3Form
              email={email}
              agreement={agreement}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              emailRef={this.emailRef}
              isFormValid={isFormValid}
            />
          )}
          {this.context.formData.role === "Professor" && (
            <ProfessorStage3Form
              email={email}
              agreement={agreement}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              emailRef={this.emailRef}
              isFormValid={isFormValid}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Stage3;