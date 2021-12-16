import { useDispatch } from "react-redux";
import { AuthActionTypes } from "../auth/Login/types";

const HomePage = () => {
  const dispatch = useDispatch();
  return (
    <>
      <h1>Головна сторінка</h1>

      <button
        className="btn btn-success"
        onClick={() => {
          dispatch({
            type: AuthActionTypes.LOGIN,
            payload: {
              email: "kombat@gmail.com",
            },
          });
          console.log("login");
        }}
      >
        Залогінити
      </button>

      <button
        className="btn btn-danger"
        onClick={() => {
          dispatch({
            type: AuthActionTypes.LOGOUT,
          });
          
        }}
      >
        Вийти
      </button>
    </>
  );
};

export default HomePage;