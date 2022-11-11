import { Button, Container, Input, Text } from "../../components";
import { FaEnvelope, FaLock } from "react-icons/fa";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { styled } from "../../stitches.config";
import { useEffect, useState } from "react";
import { app } from "../../firebase";

export const Login = () => {
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const [formFields, setFormFields] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));

    if (session) {
      if (session.user !== null) {
        setRedirect(true);
      } else {
        setRedirect(false);
      }
    } else {
      setRedirect(false);
    }
  }, []);

  const ValidateForm = () => {
    return true;
  };

  const googleLogin = () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((response) => {
        localStorage.setItem(
          "session",
          JSON.stringify({ user: response.user })
        );
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
          <InputGroup>
            <InputLabel htmlFor="email">
              <FaEnvelope size={20} />
              <Text>Email</Text>
            </InputLabel>
            <Input
              type="email"
              id="email"
              // required
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
              <FaLock size={20} />
              <Text>Password</Text>
            </InputLabel>
            <Input
              type="password"
              // required
              id="password"
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
              Don't have account?{" "}
              <StyledLink to="/dashboard">Sign up</StyledLink>
            </Text>
          </SubForm>
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
