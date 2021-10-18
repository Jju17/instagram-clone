import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import FirebaseContext from "../context/firebase";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const Container = tw.div`container flex flex-col mx-auto max-w-xs items-center justify-center h-screen`;

const TopDiv = tw.div`flex flex-col items-center bg-white p-4 border mb-4`;
const Title = tw.h1`flex justify-center w-full`;
const ImgLogo = tw.img`mt-2 w-6/12 mb-4`;
const FormInput = tw.input`text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2`;

const BottomDiv = tw.div`flex justify-center items-center flex-col w-full bg-white p-4 border`;

export default function SignUp() {
  const { firebase } = useContext(FirebaseContext);
  const db = getFirestore();
  const history = useHistory();

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid =
    username === "" ||
    fullName === "" ||
    password === "" ||
    emailAddress === "";

  useEffect(() => {
    document.title = "Log In";
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();

    const auth = getAuth();
    console.log("auth", auth);
    createUserWithEmailAndPassword(auth, emailAddress, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username,
        });

        addDoc(collection(db, "users"), {
          userId: user.user.uid,
          username,
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followed: [],
          dateCreated: Date.now(),
        });
      })
      .catch((err) => {
        setError(err.message);
        setUsername("");
        setFullName("");
        setEmailAddress("");
        setPassword("");
      });
  };

  return (
    <Container>
      <div className="flex flex-col">
        <TopDiv>
          <Title>
            <ImgLogo src="/images/logo.png" alt="Instagram" />
          </Title>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
          <form method="POST" onSubmit={handleSignUp}>
            <FormInput
              value={username}
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              onChange={({ target }) => {
                setUsername(target.value);
              }}
            />
            <FormInput
              value={fullName}
              aria-label="Enter your full name"
              type="text"
              placeholder="Full Name"
              onChange={({ target }) => {
                setFullName(target.value);
              }}
            />
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
                isInvalid
                  ? `bg-gray-400 text-white w-full rounded h-8 font-bold cursor-not-allowed`
                  : `bg-blue-500 text-white w-full rounded h-8 font-bold`
              }
              disabled={isInvalid}
              type="submit"
            >
              {" "}
              Sign Up
            </button>
          </form>
        </TopDiv>
        <BottomDiv>
          <p className={`text-sm`}>
            Have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-600">
              Log In
            </Link>
          </p>
        </BottomDiv>
      </div>
    </Container>
  );
}
