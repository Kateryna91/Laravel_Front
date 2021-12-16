import { Form, FormikHelpers, FormikProvider, useFormik } from "formik";
import React, { useState } from "react";
import { ILoginModel, ILoginServerError } from "./types";
import { LoginSchema } from "./validation";
import { InputGroup } from "../../common/InputGroup";
import { useActions } from "../../../hooks/useActions";
import { useNavigate } from "react-router";


const LoginPage = () => {
  const { LoginUser } = useActions();
  const navigator = useNavigate();

  const [invalid, setInvalid] = useState("");  

  const initialValues: ILoginModel = {
    email: "",
    password: "",
    invalid: ""
  };

  const onHandleSubmit = async (values: ILoginModel, {setFieldError}: FormikHelpers<ILoginModel>) => {
    console.log("Form submit: ", values);
    try {
      await LoginUser(values);
      navigator("/");
    }
    catch (ex) {
      const serverError = ex as ILoginServerError;
      Object.entries(serverError).forEach(([key, value])=> {
          if(Array.isArray(value))
          {
              let message = "";
              value.forEach((item)=> { message+=`${item} `; });
              setFieldError(key, message);
              //console.log(key, message);
          }
      });
      if(serverError.error)
      {
        setInvalid(serverError.error);
      }
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: onHandleSubmit,
  });

  const { errors, touched, handleChange, handleSubmit } = formik;

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1>Login page</h1>
        
        {invalid && <div className="alert alert-danger">{invalid}</div>}

        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <InputGroup
              field="email"
              label="Пошта"
              error={errors.email}
              touched={touched.email}
              onChange={handleChange}
            />

            <InputGroup
              field="password"
              label="Пароль"
              type="password"
              touched={touched.password}
              error={errors.password}
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-success">
              Вхід
            </button>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default LoginPage;
