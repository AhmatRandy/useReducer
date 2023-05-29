import React, { useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const reducer = (state, action) => {
  switch (action.type) {
    case "INPUT_EMAIL":
      return {
        ...state,
        email: action.val,
        emailValid: action.val.includes("@"),
      };
    case "INPUT_PASSWORD":
      return {
        ...state,
        password: action.val,
        passwordValid: action.val.trim().length > 6,
      };
    case "EMAIL_BLUR":
      return {
        ...state,
        email: state.email,
        emailValid: state.email.includes("@"),
      };
    case "PASSWORD_BLUR":
      return {
        ...state,
        password: state.password,
        passwordValid: state.password.trim().length > 6,
      };
    default:
      return initialState;
  }
};
const initialState = {
  email: "",
  password: "",
  emailValid: false,
  passwordValid: false,
};
const Login = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const emailChangeHandler = (event) => {
    dispatch({ type: "INPUT_EMAIL", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatch({ type: "INPUT_PASSWORD", val: event.target.value });
  };

  const validEmail = () => {
    dispatch({ type: "EMAIL_BLUR" });
  };
  const validPassword = () => {
    dispatch({ type: "PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(state.email, state.password);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            state.emailValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={state.email}
            onChange={emailChangeHandler}
            onBlur={validEmail}
          />
        </div>
        <div
          className={`${classes.control} ${
            state.passwordValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={state.password}
            onChange={passwordChangeHandler}
            onBlur={validPassword}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!state.emailValid || !state.passwordValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
