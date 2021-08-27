import React, { useState, useContext, useCallback } from "react";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { BsTriangleFill } from "react-icons/bs";
import Input from "../components/input";
import { AuthContext } from "../components/context/auth-context";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/portals/Modal";
import "./authentication.css";
let SIGN_UP;
let LOG_IN;
try {
  SIGN_UP = gql`
    mutation($email: String!, $password: String!, $name: String!) {
      createUser(email: $email, password: $password, name: $name) {
        id
        name
      }
    }
  `;

  LOG_IN = gql`
    mutation($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        id
        name
        email
      }
    }
  `;
} catch (err) {
  console.log(err);
}
function Authentication() {
  const [login, setLogin] = useState(false);
  const context = useContext(AuthContext);
  const history = useHistory();

  const [error, setError] = useState(false);
  const [forumState, setForumState] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  const inputChangeHandler = useCallback((type, value) => {
    setForumState((prev) => {
      return { ...prev, [type]: value };
    });
  }, []);

  const [signUpUser, { data: signUpData, loading }] = useMutation(SIGN_UP, {
    update(_, res) {
      console.log(res);
    },
    onError(err) {
      setError(err);
    },
  });
  const [loginUser, { data: loginData, loading: loginLoading }] = useMutation(
    LOG_IN,
    {
      update(_, res) {
        console.log(res);
      },
      onError(err) {
        setError(err);
      },
    }
  );

  const authSubmit = useCallback(() => {
    try {
      if (!login) {
        signUpUser({
          variables: {
            email: forumState.Email,
            password: forumState.Password,
            name: forumState.Name,
          },
        });
      } else {
        loginUser({
          variables: { email: forumState.Email, password: forumState.Password },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }, [login, signUpUser, forumState, loginUser]);

  if (signUpData || loginData) {
    if (signUpData) {
      context.logIn(signUpData.createUser.id, signUpData.createUser.name);
    } else {
      context.logIn(loginData.loginUser.id, loginData.loginUser.name);
    }
    history.push("/joinRoom");
  }

  return (
    <React.Fragment>
      {(loading || loginLoading) && <LoadingSpinner asOverlay={true} />}
      {error && (
        <Modal
          show={error}
          onCancel={() => {
            setError(false);
          }}
        >
          <h3>{error.message}</h3>
        </Modal>
      )}

      <div className="authentication-page">
        <p>Scoup</p>
        <br />
        <br />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="authenticate-box">
            <div className="toggle-auth">
              {!login && (
                <button
                  className="button btnOrange btnPush"
                  onClick={() => {
                    setLogin(true);
                  }}
                >
                  Sign In
                </button>
              )}

              {login && (
                <button
                  className="button btnOrange btnPush"
                  onClick={() => {
                    setLogin(false);
                  }}
                >
                  Sign Up
                </button>
              )}
            </div>

            <div className="authentication-inputs">
              {!login && <span>Sign Up</span>}
              {login && <span>Sign In</span>}
              {!login && (
                <Input
                  type="text"
                  placeholder="Example Sharma"
                  onChange={inputChangeHandler}
                  label="Name"
                />
              )}
              <Input
                type="email"
                placeholder="example@example.com"
                label="Email"
                onChange={inputChangeHandler}
              />
              <Input
                type="Password"
                placeholder="************"
                label="Password"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="submit-details">
              <button
                className="button btnOrange btnPush"
                onClick={authSubmit}
                disabled={
                  !(
                    (forumState.Name || login) &&
                    forumState.Email &&
                    forumState.Password
                  )
                }
              >
                Go
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Authentication;
