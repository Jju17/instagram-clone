import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import tw from "twin.macro";
import FirebaseContext from "../context/firebase";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Container = tw.div`container flex mx-auto max-w-screen-md items-center h-screen`;
const LeftDiv = tw.div`flex w-3/5`;
const RightDiv = tw.div`flex flex-col w-2/5`;
const TopDiv = tw.div`flex flex-col items-center bg-white p-4 border mb-4`;
const Title = tw.h1`flex justify-center w-full`;
const ImgLogo = tw.img`mt-2 w-6/12 mb-4`;
const FormInput = tw.input`text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2`;
const BottomDiv = tw.div`flex justify-center items-center flex-col w-full bg-white p-4 border `;

// # Challenge
// Manage input state validation before submitting

// Acceptance Criteria
//   - Store emailAddress, password, error in state
//   - Create a variable that can hold validate against input elements
//   - Use this variable as a source of truth to disable/enable the form button
//   - If the variable is not valid, use an opacity of 50 on the button; if the variable is valid, don't apply the opacity

// Hints
//   - you can use conditional template rendering tags for the opacity state
//   - useState

// References
//   - https://tailwindcss.com/docs/opacity
//   - https://reactjs.org/docs/hooks-state.html

export default function Login() {
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInValid = emailAddress === "" || password === "";

  useEffect(() => {
    document.title = "Log In";
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, emailAddress, password)
      .then((userCredential) => {
        const user = userCredential.user;
        history.push(ROUTES.DASHBOARD);
      })
      .catch((err) => {
        setEmailAddress("");
        setPassword("");
        setError(err.message);
      });
  };

  return (
    <Container>
      <LeftDiv>
        <img
          src="./images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </LeftDiv>
      <RightDiv>
        <TopDiv>
          <Title>
            <ImgLogo src="/images/logo.png" alt="Instagram" />
          </Title>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form method="POST" onSubmit={handleLogin}>
            <FormInput
              value={emailAddress}
              aria-label="Enter your email address"
              type="email"
              placeholder="Email Address"
              onChange={({ target }) => {
                setEmailAddress(target.value);
              }}
            />
            <FormInput
              value={password}
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              onChange={({ target }) => {
                setPassword(target.value);
              }}
            />
            <button
              className={
                isInValid
                  ? `bg-gray-400 text-white w-full rounded h-8 font-bold cursor-not-allowed`
                  : `bg-blue-500 text-white w-full rounded h-8 font-bold`
              }
              disabled={isInValid}
              type="submit"
            >
              {" "}
              Log In
            </button>
          </form>
        </TopDiv>
        <BottomDiv>
          <p className={`text-sm`}>
            Don't have an account?{" "}
            <Link to={ROUTES.SIGN_UP} className="font-bold">
              Sign up
            </Link>
          </p>
        </BottomDiv>
      </RightDiv>
    </Container>
  );
}
