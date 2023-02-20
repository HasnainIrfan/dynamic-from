import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "./input";
import Router from "next/router";

const PersonalInformation = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIyYzAwMTFiZC0xNTI0LTRjYmMtMWQ0Ny0wOGRiMTBhYmQ2OTIiLCJVc2VyTmFtZV9FTiI6IlRlc3QgQWxpIiwiVXNlck5hbWVfQVIiOiJUZXN0IEFsaSIsIkVtYWlsIjoic2FAZGlnaXRhbGdyYXBoaWtzLm5ldCIsIktleSI6IkFGLTk3LThCLUM1LUU5LTBCLTRBLTIyLTY4LTEyLTY2LURDLUJFLTNDLTAzLURELUU4IiwiVHlwZSI6IkxlYXJuZXIiLCJleHAiOjE3MDgxNTAzNzEsImlzcyI6IkxlYXJuaW5nTWFuYWdlbWVudFN5c3RlbSIsImF1ZCI6IkFGLTk3LThCLUM1LUU5LTBCLTRBLTIyLTY4LTEyLTY2LURDLUJFLTNDLTAzLURELUU4In0.UQfbSOVeGC2VqmET0EMnaLPsXRYTXwaeU6tQYJ0iddo";

  // React Form Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (Data) => {
    let courseTrainingId = "a50895f6-65d7-44c2-ba7d-08db0d866fc1";
    let active = true;
    Data.courseTrainingId = courseTrainingId;
    Data.active = active;

    const response = axios
      .post("https://stage-api.cyfersoft.com/api/Admin/v1/LMSUser", Data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        localStorage.setItem("email", Data.email);
        Router.push("/authentication-otp");
      })
      .catch((error) => {
        console.log(error, "Error on Post From");
      });

  };

  return (
    <>
      <div className="form">
        <div className="form_wrapper">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`form_box`}>
              <div className="from_left">
                <h1>Welcome to Riyadh Second Health Cluster</h1>
                <h2>
                  "First things first, we would like to begin with your contact
                  details to register your application with us. We would need
                  this information to inform you about your application status."
                </h2>
                <Input
                  label="firstName_EN"
                  name="Frist Name"
                  register={register}
                  check={{
                    required: "Frist Name is Required",
                    pattern: /^[A-Za-z]+$/i,
                    minLength: 3,
                  }}
                  type="text"
                  placeholder="Your First Name *"
                  errors={errors}
                />
                <Input
                  label="lastName_EN"
                  register={register}
                  name="Last Name"
                  check={{
                    required: "Last Name is Required",
                    pattern: /^[A-Za-z]+$/i,
                    minLength: 3,
                  }}
                  type="text"
                  placeholder="Last Name *"
                  errors={errors}
                />
                <Input
                  label="email"
                  register={register}
                  name="Email"
                  check={{
                    required: "Email is Required",
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  }}
                  type="text"
                  placeholder="Your Email *"
                  errors={errors}
                />

                <Input
                  label="phoneNumber"
                  register={register}
                  name="Phone No"
                  check={{
                    required: "Phone No is Required",
                    minLength: 11,
                  }}
                  type="number"
                  placeholder="Mobile Number *"
                  errors={errors}
                />
              </div>
              <div className="form_right">
                <div className="imageBox">
                  <img
                    src="https://riyadh-second-health-cluster-r3-rtl.vercel.app/_next/image?url=%2Fimages%2FRegisterationImg.png&w=640&q=75"
                    alt=""
                    width={400}
                  />
                </div>
              </div>
            </div>
            <div className="from_action">
              <button type="submit">Next</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PersonalInformation;
