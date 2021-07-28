/* Niko Icardo 
7/25/21 */

import React, { useState, useContext } from "react";

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData({
        ...formState.inputs,
        name: undefined
      }, formState.inputs.email.isValid && formState.inputs.password.isValid);
    } else {
      setFormData({
        ...formState.inputs, 
        name: {
          value: '', 
          isValid: false
        }
      }, false);
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
    auth.login();
  };

  return (
    
    <form className="place-form" onSubmit={authSubmitHandler}>
      <h2>Login Required</h2>
      <hr />
      {!isLoginMode &&  
      <Input
          id="name"
          element="input"
          type="text"
          label="Your Name"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a name. "
          onInput={inputHandler}
        />
        }
      <Input
        id="email"
        element="input"
        type="text"
        label="Email"
        validators={[VALIDATOR_EMAIL()]}
        errorText="Please enter a valid email address."
        onInput={inputHandler}
      />

      <Input
        id="password"
        element="input"
        type="text"
        label="Password"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid password, at least six characters."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
      </Button>
      
      <Button inverse onClick={switchModeHandler}>
        Switch to {!isLoginMode ? 'LOGIN' : 'SIGNUP'}
      </Button>
    </form>
    
  );
};

export default Auth;
