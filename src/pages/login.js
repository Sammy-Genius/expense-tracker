import { Button, Container, Input, Text, CountryCodes } from "../components";
import { FaEnvelope, FaLock, FaPhoneAlt } from "react-icons/fa";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { styled } from "../stitches.config";
import { useEffect, useState } from "react";
import { app, auth } from "../firebase";
import { useSession } from "../hooks/useSession";

export const Login = () => {
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const [formFields, setFormFields] = useState({ email: "", password: "" });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [countryCode, setCountryCode] = useState("233");
  const [showNumberForm, setShowNumberForm] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();
  const { getUser, setSession } = useSession();

  useEffect(() => {
    const user = getUser();
    if (user !== null) {
      setRedirect(true);
    } else {
      setRedirect(false);
    }
  }, [getUser]);

  const ValidateForm = () => {
    return true;
  };

  const googleLogin = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((response) => {
        setSession({ user: response.user });
        navigate("/dashboard");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setFormErrors((e) => ({
            ...e,
            password: "",
          }));
        } else {
          setFormErrors((e) => ({
            ...e,
            email: "No account exists for this email",
          }));
        }

        if (error.code === "auth/invalid-email") {
          setFormErrors((e) => ({
            ...e,
            email: "Invalid email",
          }));
        } else {
          setFormErrors((e) => ({
            ...e,
            email: "",
          }));
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ValidateForm) {
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, formFields.email, formFields.password)
        .then((response) => {
          localStorage.setItem(
            "session",
            JSON.stringify({ user: response.user })
          );
          setFormFields({ email: "", password: "" });

          navigate("/dashboard");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            setFormErrors((e) => ({
              ...e,
              email: "Invalid email" + formFields.email,
            }));
          } else {
            setFormErrors((e) => ({
              ...e,
              email: "",
            }));
          }
          if (error.code === "auth/user-not-found") {
            setFormErrors((e) => ({
              ...e,
              email: "No account exists for this email",
            }));
          } else {
            setFormErrors((e) => ({
              ...e,
              email: "",
            }));
          }

          if (error.code === "auth/wrong-password") {
            setFormErrors((e) => ({
              ...e,
              password: "Wrong password",
            }));
          } else {
            setFormErrors((e) => ({
              ...e,
              password: "",
            }));
          }

          console.log({ error });
          console.log({ code: error.code, message: error.message });
        });
    } else {
      alert("Check your details and sign in again");
    }
  };

  const handleCodeSelect = (code) => {
    setCountryCode(code);
  };

  const confirmOtp = (e) => {
    let code = e.target.value;
    setOtp(code);

    if (code.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(code)
        .then((result) => {
          const user = result.user;
          console.log({ user });
        })
        .catch((error) => {
          alert("Sign in unsuccessful. Try again");
          console.log({ error });
        });
    }
  };

  return redirect ? (
    <Navigate to="/dashboard" />
  ) : (
    <Container
      css={{ display: "grid", placeContent: "center", minHeight: "70vh" }}
    >
      <LoginForm
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <FormHeader>
          <FormTitle>Login to X-Tracker</FormTitle>
          <Text size={1} css={{ maxWidth: 300, margin: "auto" }}>
            We're glad to have you back. Login with your email and password
          </Text>
        </FormHeader>

        <FormBody>
          {showNumberForm ? (
            <>
              <InputGroup>
                <InputLabel htmlFor="phoneNumber">
                  <FaPhoneAlt size={15} />
                  <Text>Phone Number</Text>
                </InputLabel>
                <NumberGrid>
                  <CountryCodes handleCodeSelect={handleCodeSelect} />

                  <Input
                    type="number"
                    id="phoneNumber"
                    minLength={4}
                    maxLength={12}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {formErrors.email && (
                    <Text size={1} color="danger">
                      {formErrors.email}
                    </Text>
                  )}
                </NumberGrid>
              </InputGroup>

              <Button onClick={confirmOtp}>Login</Button>
            </>
          ) : (
            <>
              <InputGroup>
                <InputLabel htmlFor="email">
                  <FaEnvelope size={15} />
                  <Text>Email</Text>
                </InputLabel>
                <Input
                  type="email"
                  id="email"
                  required
                  value={formFields.email}
                  onChange={(e) =>
                    setFormFields({ ...formFields, email: e.target.value })
                  }
                />
                {formErrors.email && (
                  <Text size={1} color="danger">
                    {formErrors.email}
                  </Text>
                )}
              </InputGroup>

              <InputGroup>
                <InputLabel htmlFor="password">
                  <FaLock size={15} />
                  <Text>Password</Text>
                </InputLabel>
                <Input
                  type="password"
                  required
                  id="password"
                  value={formFields.password}
                  onChange={(e) =>
                    setFormFields({ ...formFields, password: e.target.value })
                  }
                />
                {formErrors.password && (
                  <Text size={1} color="danger">
                    {formErrors.password}
                  </Text>
                )}
              </InputGroup>
            </>
          )}

          <Button>Login</Button>

          <SubForm>
            <Text
              css={{
                maxWidth: 300,
                margin: "auto",
                marginBottom: 10,
                cursor: "pointer",
              }}
              onClick={googleLogin}
            >
              Sign in with Google
            </Text>

            <Text css={{ maxWidth: 300, margin: "auto" }}>
              Don't have an account?{" "}
              <StyledLink to="/sign-up">Sign up</StyledLink>
            </Text>
          </SubForm>
          <div id="recaptcha-container"></div>
        </FormBody>
      </LoginForm>
    </Container>
  );
};

const LoginForm = styled("form", {
  borderRadius: 6,
  background: "$lightPrimary",
  maxWidth: 500,
  margin: "auto",
  minHeight: 300,
  padding: 20,

  "@sm": {
    paddingY: 20,
    paddingX: 30,
  },

  "@lg": {
    paddingX: 40,
  },
});

const FormHeader = styled("legend", {
  textAlign: "center",
  marginBottom: 20,
});

const FormTitle = styled("h1", {
  fontWeight: "bold",
});

const FormBody = styled("h1", {
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

const InputGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 6,
});

const InputLabel = styled("label", {
  display: "flex",
  alignItems: "center",
  gap: 10,
  cursor: "pointer",
});

const StyledLink = styled(Link, {
  color: "red",
  textDecoration: "none",
});

const SubForm = styled("div", {
  textAlign: "center",
});

const NumberGrid = styled("div", {
  display: "grid",
  maxWidth: "fit-content",
  gap: 16,
  gridTemplateColumns: "2fr 3fr",
});
