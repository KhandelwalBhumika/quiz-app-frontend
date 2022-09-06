import "./style.css";

import React, { useState } from "react";
import Swal2 from "sweetalert2";
import api from "../ConfigApi/api";

const LogIn = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
    registrationId: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    const { email, password, registrationId } = user;
    if ((email || registrationId) && password) {
      api
        .post("users/logIn", user)
        .then((res) => {
          Swal2.fire({
            icon: res.data.status,
            title: res.data.message,
          });
          if (res.data.status === "success") {
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("token", res.data.token);
          }
          window.location.href= '/showAllQuestions';
        })
        .catch((error) => {
          Swal2.fire({
            icon: "error",
            title: error.response.data.message,
          });
        });
    }
  };

  return (
    <>
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md- d-flex flex-column align-items-center justify-content-center">
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your email/registrationId and password to login.
                        </p>
                      </div>

                      <form className="row g-3 needs-validation">
                        <div className="col-12">
                          <label className="form-label">*Email:</label>
                          <div className="input-group has-validation">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend"
                            >
                              @
                            </span>
                            <input
                              className="form-control"
                              placeholder="Email"
                              name="email"
                              value={user.email}
                              type="email"
                              onChange={handleChange}
                              // required="true"
                            />
                          </div>
                        </div>
                        <h3>Or</h3>
                        <div className="col-12">
                          <label className="form-label">
                            *Registration Id:
                          </label>
                          <div className="input-group has-validation">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend"
                            ></span>
                            <input
                              className="form-control"
                              placeholder="Registration Id"
                              name="registrationId"
                              value={user.registrationId}
                              type="number"
                              onChange={handleChange}
                              // required="true"
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <label className="form-label">*Password:</label>
                          <input
                            placeholder="Password"
                            name="password"
                            value={user.password}
                            type="password"
                            onChange={handleChange}
                            className="form-control"
                            required="true"
                          />
                        </div>
                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100 submit-button"
                            type="submit"
                            onClick={login}
                          >
                            Login
                          </button>
                        </div>
                      </form>

                      <div className="col-12">
                        <p className="small mb-0">
                          Don't have an account?
                          <a href="/signUp" className="btn btn-primary w-100">
                            Register
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
export default LogIn;
