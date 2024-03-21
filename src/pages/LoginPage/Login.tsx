import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";

import Line from "/images/Vector 8.svg";
import Footer from "../../components/Footer";
import "./Login.css";
import { apiHandler } from "../../../function";
import { useSetUser } from "../../hooks";
import { setToken } from "../../../localStorage";

const LoginPage: React.FC = () => {
  const [, setUser] = useSetUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const logIn = async () => {
    setIsLoading(true);
    const res = await apiHandler({
      path: "user/login",
      body: {
        email,
        password,
      },
      method: "POST",
    });

    if (res.error) {
      setError("Login is not Successfull");
      setIsLoading(false);
      console.log(res.error);
      return;
    }

    setUser(res.data.data);
    setToken(res.data.accessToken);
    setIsLoading(false);
    setLogin("Login Successful!");
    navigate("/");
  };

  const passwordCheck = (newPassword: string) => {
    const value = newPassword;
    setPassword(value);
    console.log(value, "Checking password");
  };

  return (
    <section className="login-container">
      <div className="form-div">
        <p className="signup">Log in</p>
        <div className="buttons-container"></div>
        <p className="lin-container">
          <span>
            <img src={Line} alt="Line" className="w-[20em]" />
          </span>
          <span>
            <img src={Line} alt="Line" className="w-[20em]" />
          </span>
        </p>
        <form
          className="flex flex-col gap-[1.6em] w-[90%]"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="container flex flex-col gap-[1em]">
            <div>
              <input
                type="text"
                placeholder="Email address or username"
                required
                pattern="^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$) | ([a-zA-Z]+$)"
                className="input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb">
              <PasswordInput onChange={passwordCheck} placeholder="Password" />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="forgot">
              <Link to="/forgotpassword" className="forgot">
                Forgot your password?
              </Link>
            </div>
            {login && (
              <p className="text-green-500 text-base mt-1 font-medium">
                {login}
              </p>
            )}
            <div>
              <button onClick={logIn} className="login-btn">
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div>
              <p className="dont">
                Don't have an account?{" "}
                <Link to="/register" className="sign-up-text">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </form>
        <div>
          <p>
            <span className="by">
              By signing in with an account you agree to
            </span>
            <span className="privacy-policy">
              Scissors <strong>Terms of service</strong>,
              <strong>Privacy Policy</strong> and
              <strong>Acceptable Use Policy</strong>
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default LoginPage;
