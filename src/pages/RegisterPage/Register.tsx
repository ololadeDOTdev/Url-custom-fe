import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import Footer from "../../components/Footer.js";
import "./Register.css";
import Spinner from "../../components/Spinner.js";
import { apiHandler } from "../../../function";

const RegisterPage: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  const registerAuthentication = async () => {
    setIsLoading(true);
    const res = await apiHandler({
      body: {
        name,
        email,
        password,
      },
      path: "user/create",
      method: "POST",
    });

    if (res.error) {
      setIsLoading(false);
      return;
    }

    navigate("/login");
    setIsLoading(false);
  };

  const handleNameValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (/\d/.test(newName) || /[!@#$%^&*(),.?":{}|<>]/g.test(newName)) {
      setNameError("Name cannot contain numbers or special characters");
    } else {
      setNameError("");
    }
    setName(newName);
  };

  const handleEmailValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    if (!/@/.test(newEmail)) {
      setEmailError("Email must contain @ symbol");
    } else {
      setEmailError("");
    }
    setEmail(newEmail);
  };

  const handlePasswordValidation = (newPassword: string) => {
    if (/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/g.test(newPassword)) {
      setPasswordError("");
    } else {
      setPasswordError(
        "Password must be 6 or more characters and contain at least one number, one uppercase, and one lowercase letter."
      );
    }
    setPassword(newPassword);
  };

  return (
    <section>
      <div className="register-container">
        {isLoading && <Spinner isLoading={isLoading} />}
        <form className="form-div" onSubmit={(e) => e.preventDefault()}>
          <p className="signup">Sign up</p>

          <div className="input-div">
            <div>
              <input
                name="name"
                id="name"
                type="text"
                value={name}
                placeholder="Username"
                required
                onChange={handleNameValidation}
                className="input"
              />
              {nameError && <p className="error">{nameError}</p>}
            </div>

            <div>
              <input
                name="email"
                id="email"
                type="email"
                value={email}
                placeholder="Email address"
                required
                onChange={handleEmailValidation}
                className="input"
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>

            <div>
              <PasswordInput
                onChange={handlePasswordValidation}
                placeholder="Password"
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>

            <button
              onClick={registerAuthentication}
              disabled={isLoading}
              className="sign-in-btn"
            >
              {isLoading ? "Signing up..." : "Sign up with Email"}
            </button>

            <p className="already">
              Already have an account?{" "}
              <Link to="/login" className="login-text">
                Log in
              </Link>
            </p>

            <div>
              <p>
                <span className="by">
                  By signing in with an account you agree to
                </span>
                <span className="privacy-policy">
                  Scissors <strong>Terms of service</strong>,{" "}
                  <strong>Privacy Policy</strong> and{" "}
                  <strong>Acceptable Use Policy</strong>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default RegisterPage;
