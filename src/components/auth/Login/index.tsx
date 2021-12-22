import { useState } from "react";
import { Form, FormikProvider, FormikHelpers, useFormik } from "formik";
import {ILoginModel, ILoginErrors} from './types';
import {LoginSchema} from './validation';
import {InputGroup} from '../../common/InputGroup';
import { useNavigate } from "react-router";
import { useActions } from "../../../hooks/useActions";
import EclipseWidget from '../../common/eclipse';

const LoginPage = () => {
  const { LoginUser } = useActions();
  const navigator = useNavigate();

  const [invalid, setInvalid] = useState("");  

  const initialValues: ILoginModel = {
    email: "",
    password: "",
    invalid: ""
  };

  
  const onHandleSubmit = async (values: ILoginModel, { setFieldError }: FormikHelpers<ILoginModel>) => {
    try {
      setLoading(true); // починаєм загрузку
      await LoginUser(values); // кідаєм дані в екшн
      await navigator("/"); // переходим на головну
      await setLoading(false); // закінчуєм загрузку
    } 
    catch (errors) {
      setLoading(false); // закінчуєм хибну загрузку
      const serverErrors = errors as ILoginErrors; //витягуєм помилки згідно інтерфейсу ILoginError
      const { password, invalid } = serverErrors; //створюєм змінні для перевірки

      if (password !== undefined) { //перевіряємо чи є помилки для пароля
        setFieldError("password", password[0]);
      }
      console.log(invalid.length);
      
      if (invalid !== undefined){ //перевіряємо чи є стороні помилки
        setFieldError("invalid", invalid[0]);
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
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

