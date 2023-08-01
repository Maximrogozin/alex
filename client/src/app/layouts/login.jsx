import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router-dom";
import RegistorForm from "../components/ui/registorForm";

const Login = () => {
    const { type } = useParams;
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toogleFormType = () => {
        setFormType((prevstate) =>
            prevstate === "register" ? "login" : "register"
        );
    };
    return (
        <div className="container mt-5 ">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Register</h3>
                            <RegistorForm />
                            <p>
                                Already have account?
                                <a role="button" onClick={toogleFormType}>
                                    {" "}
                                    Sign In
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Login</h3>
                            <LoginForm />
                            Dont have account?
                            <a role="button" onClick={toogleFormType}>
                                {" "}
                                Sign Up
                            </a>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
