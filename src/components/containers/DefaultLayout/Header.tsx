import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

const Header = () => {
  
  const { isAuth, user } = useTypedSelector((store) => store.auth);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Авто США
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/auto/create">
                Додати авто
              </Link>
            </li>
          </ul>
          {isAuth ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  {user?.email}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  Вихід
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Вхід
                </Link>
              </li>
              <li className="nav-item text-nowrap">
                <Link className="nav-link" to="/Register">
                    Реєстрація
                </Link>
            </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
