import Joi from "joi";
import { useFormik } from "formik";
import PageHeader from "../components/common/pageHeader";
import Input from "../components/common/input";
import { useAuth } from "../contexts/auth.context";
import { Navigate, useNavigate } from "react-router-dom";

function SignIn() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate(values) {
      const schema = Joi.object({
        email: Joi.string()
          .min(6)
          .max(255)
          .required()
          .email({ tlds: { allow: false } })
          .label("Email"),
        password: Joi.string().min(6).max(1024).required().label("Password"),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }

      const errors = {};
      for (const detail of error.details) {
        const key = detail.path[0];
        errors[key] = detail.message;
      }
      return errors;
    },
    async onSubmit(values) {
      const response = await login(values);
      console.log(response);

      navigate("/");
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }
  console.log(user);

  return (
    <div className="container">
      <PageHeader title="Sign In" description="Sign in with your account" />

      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        <Input
          {...form.getFieldProps("email")}
          type="email"
          label="Email"
          placeholder="john@doe.com"
          required
          error={form.touched.email && form.errors.email}
        />
        <Input
          {...form.getFieldProps("password")}
          type="password"
          label="Password"
          required
          error={form.touched.password && form.errors.password}
        />

        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
