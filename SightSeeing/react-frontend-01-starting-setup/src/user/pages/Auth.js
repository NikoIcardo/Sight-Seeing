/* Niko Icardo 
7/25/21 */

import React from "react";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./Auth.css";

const Auth = () => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
      <form className="place-form" onSubmit={authSubmitHandler}>
        <h2>Login Required</h2>
        <hr />
        <Input
          id="email"
          element="input"
          type="text"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
          initialValue=""
          initialValidity={false}
        />

        <Input
          id="password"
          element="input"
          type="text"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please Enter a valid password, at least six characters."
          onInput={inputHandler}
          initialValue=""
          initialValidity={false}
        />
        <Button type="submit" disabled={!formState.isValid}>
          LOGIN
        </Button>
      </form>
  );
};

export default Auth;
