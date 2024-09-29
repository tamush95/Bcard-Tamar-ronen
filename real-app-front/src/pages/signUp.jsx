import Joi from "joi";
import { useFormik } from "formik";
import Input from "../components/common/input";
import PageHeader from "../components/common/pageHeader";
import usersService, { createUser } from "../services/usersService";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import CheckBox from "../components/checkBox";

function SignUp() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const { user, signUp } = useAuth();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: {
        first: "",
        middle: "",
        last: "",
      },
      phone: "",
      email: "",
      password: "",
      image: {
        url: "",
        alt: "",
      },
      address: {
        state: "",
        country: "",
        city: "",
        street: "",
        houseNumber: 0,
        zip: 0,
      },
      isBusiness: false,
    },
    validate(values) {
      const schema = Joi.object({
        name: Joi.object()
          .keys({
            first: Joi.string().min(2).max(256).required(),
            middle: Joi.string().min(2).max(256).allow(""),
            last: Joi.string().min(2).max(256).required(),
          })
          .required(),

        phone: Joi.string()
          .ruleset.regex(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)

          .rule({ message: 'user "phone" mast be a valid phone number' })
          .required(),
        email: Joi.string()
          .ruleset.pattern(
            /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
          )
          .rule({ message: 'user "mail" mast be a valid mail' })
          .required(),
        password: Joi.string()
          .ruleset.regex(
            /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
          )
          .rule({
            message:
              'user "password" must be at least nine characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*-',
          })
          .required(),
        image: Joi.object()
          .keys({
            url: Joi.string()
              .ruleset.regex(
                /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
              )
              .rule({ message: "user image mast be a valid url" })
              .allow(""),
            alt: Joi.string().min(2).max(256).allow(""),
          })
          .required(),
        address: Joi.object()
          .keys({
            state: Joi.string().allow(""),
            country: Joi.string().required(),
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNumber: Joi.number().required(),
            zip: Joi.number(),
          })
          .required(),
        isBusiness: Joi.boolean().required(),
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
      try {
        const res = await createUser(values);
        console.log(res);
        console.log(values);

        navigate("/sign-in");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <PageHeader title="Sign Up" description="Create a new account" />

      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        <div className="d-flex gap-3">
          <Input
            {...form.getFieldProps("name.first")}
            type="text"
            label="First"
            placeholder="John"
            required
            error={form.touched.name?.first && form.errors.name?.first}
          />
          <Input
            {...form.getFieldProps("name.middle")}
            type="text"
            label="Middle"
            placeholder="Johnny"
            required
            error={form.touched.name?.middle && form.errors.name?.middle}
          />
          <Input
            {...form.getFieldProps("name.last")}
            type="text"
            label="last"
            placeholder="Doe"
            required
            error={form.touched.name?.last && form.errors.name?.last}
          />
        </div>
        <div className="d-flex gap-3">
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
          <Input
            {...form.getFieldProps("phone")}
            type="string"
            label="Phone"
            required
            error={form.touched.phone && form.errors.phone}
          />
        </div>
        <div className="d-flex gap-3">
          <Input
            {...form.getFieldProps("image.url")}
            type="text"
            label="Image Url"
            error={form.touched.image?.url && form.errors.image?.url}
          />
          <Input
            {...form.getFieldProps("image.alt")}
            type="text"
            label="Image Alt"
            error={form.touched.image?.alt && form.errors.image?.alt}
          />
        </div>
        <div className="d-flex gap-3">
          <Input
            {...form.getFieldProps("address.country")}
            type="text"
            label="Country"
            required
            error={
              form.touched.address?.country && form.errors.address?.country
            }
          />
          <Input
            {...form.getFieldProps("address.state")}
            type="text"
            label="State"
            required
            error={form.touched.address?.state && form.errors.address?.state}
          />
          <Input
            {...form.getFieldProps("address.city")}
            type="text"
            label="City"
            required
            error={form.touched.address?.city && form.errors.address?.city}
          />
          <Input
            {...form.getFieldProps("address.street")}
            type="text"
            label="Street"
            required
            error={form.touched.address?.street && form.errors.address?.street}
          />
          <Input
            {...form.getFieldProps("address.houseNumber")}
            type="number"
            label="House number"
            required
            error={
              form.touched.address?.houseNumber &&
              form.errors.address?.houseNumber
            }
          />
          <Input
            {...form.getFieldProps("address.zip")}
            type="number"
            label="Zip"
            required
            error={form.touched.address?.zip && form.errors.address?.zip}
          />
        </div>
        <CheckBox
          {...form.getFieldProps("isBusiness")}
          type="checkbox"
          label="Business account"
        />

        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
