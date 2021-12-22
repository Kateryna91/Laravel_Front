import { useState } from "react";
import { Form, FormikProvider, FormikHelpers, useFormik } from "formik";
import { useActions } from '../../../hooks/useActions';
import { useNavigate } from 'react-router';
import {IRegisterModel, RegisterError} from './types';
import {RegisterSchema} from './validation';
import {InputGroup} from '../../common/InputGroup';
import EclipseWidget from '../../common/eclipse';
import { RegisterUser } from "./actions";


const RegiterPage = () =>{


    const initialValues : IRegisterModel={
        email: "",
        name: "",
        photo: [],
        password: "",
        confirmPassword: ""
    }

    
    const [loading, setLoading] = useState<boolean>(false);
    const navigator = useNavigate();

    const [img, setImg] = useState<string>();
    //const { RegisterUser } = useActions();

    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setFieldValue("photo", (e.target as any).files[0]);
      const file = (e.target as any).files[0]
      setImg( URL.createObjectURL(file));
    }

    const onHandleSubmit = async (values: IRegisterModel, { setFieldError }: FormikHelpers<IRegisterModel>) =>
    {
      //коментарі до коду в логінці
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) =>
        formData.append(key, value)
      );
      try {
        setLoading(true);
        await RegisterUser(formData);
        await navigator("/");
        await setLoading(false);
      }
      catch (err) {
        setLoading(false);
        const serverErrors = err as RegisterError;
        const {email, password, confirmPassword} = serverErrors;
        if(password?.length !== 0)
          setFieldError("password", password[0]);
        if (email?.length !== 0)
          setFieldError("email", email[0]);
        if (confirmPassword?.length !== 0) 
          setFieldError("confirmPassword", confirmPassword[0]);
      }
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: RegisterSchema,
        onSubmit: onHandleSubmit
    })

    const { errors, touched, handleChange, handleSubmit, setFieldValue } = formik;




    return(
            <div className="row">
              <div className="col-2">
                {img && (
                  <div className="card mt-5">
                    <div className="card-body text-center">
                      <img src={img} height='300px' alt="asdasd" />
                    </div>
                  </div>
                )}
              </div>
              <div className="col-md-6 offset-md-3">
                <h1>Реєстрація на сайті</h1>
                <FormikProvider value={formik}>
                  <Form onSubmit={handleSubmit}>
                    <InputGroup
                      field="email"
                      label="Пошта"
                      //placevalue ="Введіть пошту"
                      error={errors.email}
                      touched={touched.email}
                      onChange={handleChange}
                    />

                    <InputGroup
                      field="name"
                      label="Логін"
                      //placevalue ="Введіть логін"
                      error={errors.name}
                      touched={touched.name}
                      onChange={handleChange}
                    />
        
                    <InputGroup
                      field="password"
                      label="Пароль"
                      type="password"
                      //placevalue ="Введіть пароль"
                      touched={touched.password}
                      error={errors.password}
                      onChange={handleChange}
                    />

                    <InputGroup
                      field="confirmPassword"
                      label="Повторіть пароль"
                      type="password"
                      //placevalue ="Повторіть пароль"
                      touched={touched.confirmPassword}
                      error={errors.confirmPassword}
                      onChange={handleChange}
                    />

                    <InputGroup
                      field="photo"
                      label="Аватар"
                      //type="file"
                      //placevalue = "Виберіть фото"
                      error={errors.photo}
                      onChange={handleFileChange}
                      touched={touched.photo}
                    />
      
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        Реєстрація
                    </button>
                  </Form>
                </FormikProvider>
              </div>
              <div className="col-3"></div>
                    {loading && <EclipseWidget />}
            </div>
    );
}
export default RegiterPage;
