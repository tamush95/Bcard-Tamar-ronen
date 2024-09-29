import Joi from "joi";
import { useFormik } from "formik";
import Input from "../components/common/input";
import PageHeader from "../components/common/pageHeader";
import usersService, { createUser } from "../services/usersService";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth.context";
import { createCard } from "../services/cardServices";

function CreateCard() {
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      title: "",
      subtitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
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
    },
    validate(values) {
      const schema = Joi.object({
        title: Joi.string().min(2).max(256).required().required(),
        subtitle: Joi.string().min(2).max(256).required().required(),
        description: Joi.string().min(2).max(256).required().required(),

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
        web: Joi.string().min(14),

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
        address: Joi.object().keys({
          state: Joi.string().allow(""),
          country: Joi.string().required(),
          city: Joi.string().required(),
          street: Joi.string().required(),
          houseNumber: Joi.number().required(),
          zip: Joi.number(),
        }),
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
        const res = await createCard(values);
        console.log(res);
        console.log(values);

        navigate("/");
      } catch (err) {
        if (err.response?.status === 400) {
          setServerError(err.response.data);
        }
      }
    },
  });

  return (
    <div className="container">
      <PageHeader title="Create card" description="Create a new card" />

      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {serverError && <div className="alert alert-danger">{serverError}</div>}
        <div className="d-flex gap-3">
          <Input
            {...form.getFieldProps("title")}
            type="text"
            label="Title"
            required
            error={form.touched.title && form.errors.title}
          />
          <Input
            {...form.getFieldProps("subtitle")}
            type="text"
            label="Subtitle"
            required
            error={form.touched.subtitle && form.errors.subtitle}
          />
          <Input
            {...form.getFieldProps("description")}
            type="text"
            label="Description"
            required
            error={form.touched.description && form.errors.description}
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
            {...form.getFieldProps("web")}
            type="text"
            label="Web"
            error={form.touched.web && form.errors.web}
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
            error={form.touched.address?.zip && form.errors.address?.zip}
          />
        </div>

        <div className="my-2">
          <button
            type="submit"
            disabled={!form.isValid}
            className="btn btn-primary"
          >
            Create card{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCard;
