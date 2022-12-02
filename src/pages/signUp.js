import { Button, Container, Input, Text } from "../components";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { styled } from "../stitches.config";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useSession } from "../hooks/useSession";

export const SignUp = () => {
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formFields, setFormFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [redirect, setRedirect] = useState(false);

  const { getUser, setSession } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    const user = getUser();
    if (user !== null) {
      // setRedirect(true);
    } else {
      setRedirect(false);
    }
  }, [getUser]);

  const ValidateForm = () => {
    if (formFields.password !== formFields.confirmPassword) {
      setFormErrors({
        ...formErrors,
        confirmPassword: "Passwords do not match",
      });
      return false;
    } else {
      setFormErrors({
        ...formErrors,
        confirmPassword: "",
      });
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ValidateForm()) {
      createUserWithEmailAndPassword(
        auth,
        formFields.email,
        formFields.password
      )
        .then((response) => {
          setSession({ user: response.user });
          console.log(response.user);
          setFormFields({ email: "", password: "", confirmPassword: "" });
          navigate("/dashboard");
        })
        .catch((error) => {
          if (error.code === "auth/network-request-failed") {
            alert("Registration unsuccessful. Try again");
          }

          if (error.code === "auth/weak-password") {
            setFormErrors((e) => ({
              ...e,
              password: "Weak password",
            }));
          } else {
            setFormErrors((e) => ({
              ...e,
              password: "",
            }));
          }

          if (error.code === "auth/email-already-in-use") {
            setFormErrors((e) => ({
              ...e,
              email: "An account already exists for this email",
            }));
          } else {
            setFormErrors((e) => ({
              ...e,
              email: "",
            }));
          }

          console.log({ error });
          console.log({ code: error.code, message: error.message });
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
          <FormTitle>Create an account</FormTitle>
          <Text size={1} css={{ maxWidth: 300, margin: "auto" }}>
            Register for a free X-Tracker account
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
              required
              onChange={(e) =>
                setFormFields({ ...formFields, email: e.target.value })
              }
              placeholder="example@email.com"
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
              required
              id="password"
              onChange={(e) =>
                setFormFields({ ...formFields, password: e.target.value })
              }
              placeholder="Enter a strong password"
            />
            {formErrors.password && (
              <Text size={1} color="danger">
                {formErrors.password}
              </Text>
            )}
          </InputGroup>
          <InputGroup>
            <InputLabel htmlFor="confirmPassword">
              <FaLock size={20} />
              <Text>Confirm Password</Text>
            </InputLabel>
            <Input
              type="password"
              required
              id="confirmPassword"
              onChange={(e) =>
                setFormFields({
                  ...formFields,
                  confirmPassword: e.target.value,
                })
              }
              placeholder="Confirm password"
            />
            {formErrors.confirmPassword && (
              <Text size={1} color="danger">
                {formErrors.confirmPassword}
              </Text>
            )}
          </InputGroup>

          <Button>Sign up</Button>

          <SubForm>
            {/* <Text
              css={{
                maxWidth: 300,
                margin: "auto",
                marginBottom: 10,
                cursor: "pointer",
              }}
              onClick={googleLogin}
            >
              Sign in with Google
            </Text> */}

            <Text>
              Already have an account?{" "}
              <StyledLink to="/login">Login</StyledLink>
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
