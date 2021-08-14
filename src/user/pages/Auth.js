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
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'; 
import  ErrorModal  from '../../shared/components/UIElements/ErrorModal';
import Card from '../../shared/components/UIElements/Card';
import './Auth.css';


const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState();

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

  const authSubmitHandler =  async event => {
    event.preventDefault();
    
    if(isLoginMode){
    } else {
      try {
        setIsLoading(true); 
        const response = await fetch('http://localhost:5000/api/users/signup/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({
            name: formState.inputs.name.value, 
            email: formState.inputs.email.value, 
            password: formState.inputs.password.value
          })
        });

        const responseData = response.json();
        // the following is a response object property that is true if there is a 200ish status code. 
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        console.log(responseData);
        setIsLoading(false);
        auth.login();
      } catch (err) {
        setIsLoading(false);
        setError(err.message || 'Something went wrong, please try again.');
        console.log(error);
      }
    }
  };


  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {isLoading && <LoadingSpinner asOverlay/>}
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
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
          
          <Button inverse type="button" onClick={switchModeHandler}>
            Switch to {!isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
