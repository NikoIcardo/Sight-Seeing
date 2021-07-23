/*Niko Icardo 
7/20/21*/ 

import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };

    case 'SET_DATA': 
     return {
      inputs: action.inputs, 
      isValid: action.formIsValid
     }
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  /*useCallback is used below to avoid an infinite loop by using the useEffect hook in sequence with the onInput function. 
  It memoizes the function and runs it when the specified conditions are triggered rather than creating a new function object
  each time the NewPlace component is rendered by react. */
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA', 
      inputs: inputData, 
      formIsValid: formValidity
    }); 
  }, []);

  return [formState, inputHandler, setFormData];
};

