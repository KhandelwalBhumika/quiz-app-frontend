import './style.css';

import React, { useState } from 'react';
import Swal2 from "sweetalert2";
import api from "../ConfigApi/api";

const SignUp = () => {
  const [user, setUser] = useState({
             firstName: "",
             lastName: "",
             email: "",
             registrationId: "",
             password: ""
       })

       const handleChange = (event) => {
                 const {name, value} = event.target;
                 setUser({
                 ...user,
                    [name]: value
             })
              };

              const registration = (e) =>{
                e.preventDefault()
                const {firstName, lastName, email, password, registrationId} = user;
                if(firstName && lastName && email && password && registrationId){
                    api.post("users/signUp", user)
                    .then((res)=>{
                        Swal2.fire({
                            icon : res.data.status,
                            title: res.data.message
                        })
                        window.location.href = './logIn';
                    })
                    .catch((error)=>{
                      Swal2.fire({
                          icon : "error",
                          text: error.response.data.message
                      })
                    })
                }
              }
  return (
    <>
    <main>
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md- d-flex flex-column align-items-center justify-content-center">

              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                    <p className="text-center small">Enter your details to create account.</p>
                  </div>

                  <form className="row g-3 needs-validation" 
                  onSubmit={registration}
                  >

                  <div className="col-12">
                    <label htmlFor="firstName" className="form-label">*Your First Name</label>
                    <input type="text" name="firstName" className="form-control" id="firstName" placeholder='First Name' 
                    onChange={handleChange} required />
                  </div>

                  <div className="col-12">
                    <label htmlFor="lastName" className="form-label">*Your Last Name</label>
                    <input type="text" name="lastName" className="form-control" id="lastName" placeholder='Last Name'
                    onChange={handleChange} required />
                  </div>

                  <div className="col-12">
                    <label htmlFor="yourEmail" className="form-label">*Email</label>
                    <input  name="email" className="form-control" id="yourEmail" placeholder='Email'
                    onChange={handleChange} required />
                  </div>

                  <div className="col-12">
                    <label htmlFor="registrationId" className="form-label">*Registration Id:</label>
                    <input type="number" name="registrationId" className="form-control" id="registrationId" placeholder="Please enter 6 digit registration Id" 
                    onChange={handleChange} required />
                  </div>

                  <div className="col-12">
                    <label htmlFor="yourPassword" className="form-label">*Password</label>
                    <input type="password" name="password" className="form-control" id="yourPassword" placeholder='Password'
                    onChange={handleChange} required />
                  </div>


                  <div>
                    <div className="col-12">
                    <button className="btn btn-primary w-100 submit-button" type="submit" 
                    >Create Account</button>
                    </div>
                    <div className="col-12">
                    <p className="small mb-0">Already have an account? 
                    <a href="/logIn" className="btn btn-primary w-100">Log-In</a>
                    </p>
                    </div>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</main>
    </>

  )
}

export default SignUp;


