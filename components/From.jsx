import axios from 'axios';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import Input from './input';
import Router from 'next/router'

const From = () => {
    const [isOPT, setIsOTP] = useState(false)
    const [isData, setIsData] = useState()
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIyYzAwMTFiZC0xNTI0LTRjYmMtMWQ0Ny0wOGRiMTBhYmQ2OTIiLCJVc2VyTmFtZV9FTiI6IlRlc3QgQWxpIiwiVXNlck5hbWVfQVIiOiJUZXN0IEFsaSIsIkVtYWlsIjoic2FAZGlnaXRhbGdyYXBoaWtzLm5ldCIsIktleSI6IkFGLTk3LThCLUM1LUU5LTBCLTRBLTIyLTY4LTEyLTY2LURDLUJFLTNDLTAzLURELUU4IiwiVHlwZSI6IkxlYXJuZXIiLCJleHAiOjE3MDgxNTAzNzEsImlzcyI6IkxlYXJuaW5nTWFuYWdlbWVudFN5c3RlbSIsImF1ZCI6IkFGLTk3LThCLUM1LUU5LTBCLTRBLTIyLTY4LTEyLTY2LURDLUJFLTNDLTAzLURELUU4In0.UQfbSOVeGC2VqmET0EMnaLPsXRYTXwaeU6tQYJ0iddo"
    const {
        register,
        handleSubmit,
        formState: { errors },
        // watch,
        reset,
    } = useForm({
        mode: "onTouched",
    });
    const onSubmit = (Data) => {
        let courseTrainingId = "a50895f6-65d7-44c2-ba7d-08db0d866fc1";
        let active = true;
        let wanIp = "103.244.177.2";
        const header = "string"

        Data.courseTrainingId = courseTrainingId;
        Data.active = active;
        if (isOPT) {
            Data.wanIp = wanIp;
            Data.header = header;
        }
        if (isOPT) {
            const response = axios.post('https://stage-api.cyfersoft.com/api/Admin/v1/LMSAuth/LoginOTP',
                Data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    Router.push('/secoundstep')
                })
                .catch((error) => {
                    console.log(error, "Error on Post From");
                })
        } else {
            const response = axios.post('https://stage-api.cyfersoft.com/api/Admin/v1/LMSUser',
                Data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    // if (response.data.statusCode === 200) {
                    // }
                    setIsOTP(true)
                })
                .catch((error) => {
                    console.log(error, "Error on Post From");
                })
            setIsData(Data)
        }
    };  
    return (
        <>
            <div className="form">
                <div className="form_wrapper">
                    <div className={`form_box ${isOPT ? "form_box_Active" : ""} `}>
                        <h1>Form</h1>
                        {isOPT && <h2>We would like to verify your mobile number</h2>}
                        {isOPT && <p>Please enter the 6 digit code sent to your mobile number</p>}
                        {isOPT && <span>{isData.phoneNumber}</span>}
                        {isOPT && <h4>Please enter your security code</h4>}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {!isOPT &&
                                <>
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
                                </>
                            }
                            {
                                isOPT &&
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
                            }
                            <button type='submit'>Submit</button>
                        </form>
                    </div>

                    {/* <div className={`otp_box ${isOPT ? "otp_box_Active" : ""} `}>
                        <h2>We would like to verify your mobile number</h2>
                        <p>Please enter the 6 digit code sent to your mobile number</p>
                        <span></span>
                        <h4>Please enter your security code</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            
                            <button type='submit'>Submit</button>
                        </form>
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default From