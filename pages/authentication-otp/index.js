import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Router from "next/router";
import Input from "@/components/input";
import axios from "axios";

const index = () => {
  const [email, setEmail] = useState();
  const [isPhone, setIsPhone] = useState();

  // React Form Hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    const email = localStorage.getItem("email");
    setEmail(email);
  }, []);

  const onSubmit = (Data) => {
    const courseTrainingId = "a50895f6-65d7-44c2-ba7d-08db0d866fc1";
    const wanIp = "119.155.164.110";
    const header = "string";
    Data.wanIp = wanIp;
    Data.courseTrainingId = courseTrainingId;
    Data.header = header;
    Data.email = email;

    const response = axios
      .post(
        "https://stage-api.cyfersoft.com/api/Admin/v1/LMSAuth/LoginOTP",
        Data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        Router.push("/registeration-step");
        // localStorage.setItem("id", response?.data.data.id);
        localStorage.setItem("access_token", response?.data.message);
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
                <h2>"We would like to verify your mobile number"</h2>
                <p>Please enter the 6 digit code sent to your mobile number</p>
                <h4>Please enter your security code</h4>
                <Input
                  label="otp"
                  register={register}
                  name="OTP No"
                  check={{
                    required: "OTP No is Required",
                    minLength: 6,
                  }}
                  type="number"
                  placeholder="OTP Number *"
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

export default index;
