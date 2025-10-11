import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const FormikForm = () => {
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    console.log("Form Data:", values);
    alert(`User ${values.username} registered successfully!`);
    resetForm();
    setSubmitting(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>User Registration (Formik)</h2>
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div style={{ marginBottom: "1rem" }}>
              <label>Username:</label>
              <Field type="text" name="username" placeholder="Enter username" />
              <ErrorMessage
                name="username"
                component="p"
                style={{ color: "red" }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label>Email:</label>
              <Field type="email" name="email" placeholder="Enter email" />
              <ErrorMessage
                name="email"
                component="p"
                style={{ color: "red" }}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label>Password:</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter password"
              />
              <ErrorMessage
                name="password"
                component="p"
                style={{ color: "red" }}
              />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
