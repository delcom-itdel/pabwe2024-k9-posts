import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaPlus, FaUser, FaRightFromBracket } from "react-icons/fa6";

function Navigation({ authLogin, onAuthSignOut }) {
  const { id, name, photo } = authLogin;
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Post App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navApp"
            aria-controls="navApp"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navApp">
            <ul className="navbar-nav ms-auto ">
              <li className="d-lg-none mt-2">
                <div className="d-flex justify-content-between align-items-center">
                  <Link
                    className="btn btn-light btn-sm text-dark"
                    to="/post/add"
                  >
                    <FaPlus /> Buat Post
                  </Link>
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navUserMobile"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      className="nav-profile rounded-circle"
                      src={photo}
                      alt={id}
                      title={name}
                      style={{ width: "30px", height: "30px" }} // Ukuran gambar profil
                    />
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navUserMobile"
                  >
                    <li>
                      <Link className="dropdown-item" to="/users/me">
                        <FaUser /> Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="dropdown-item"
                        onClick={onAuthSignOut}
                      >
                        <FaRightFromBracket />
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="d-none d-lg-block mt-2">
                <Link className="btn btn-light btn-sm text-dark" to="/post/add">
                  <FaPlus /> Buat Post
                </Link>
              </li>
              <li className="nav-item dropdown d-none d-lg-block">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navUser"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    className="nav-profile rounded-circle"
                    src={photo}
                    alt={id}
                    title={name}
                    style={{ width: "30px", height: "30px" }} // Ukuran gambar profil
                  />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navUser"
                >
                  <li>
                    <Link className="dropdown-item" to="/users/me">
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item"
                      onClick={onAuthSignOut}
                    >
                      <FaRightFromBracket />
                      Sign out
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

const authLoginShape = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authLogin: PropTypes.shape(authLoginShape).isRequired,
  onAuthSignOut: PropTypes.func.isRequired,
};

export default Navigation;
