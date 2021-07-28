/*Niko Icardo 
7/19/21
*/

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous skyscrapers in the world.",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.784405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Emp. State Building",
    description: "One of the most famous skyscrapers in the world.",
    imageURL:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/250px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.784405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true); 

  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]); 
  /*the above useEffect's setFormData will not change each re-render because it is a function wrapped in a useCallback hook. Furthermore the identifiedPlace will not change because
  it will always be the same logic*/

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card><h2>Could Not Find a Place!</h2></Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
    <Input
      id="title"
      element="input"
      type="text"
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid title"
      onInput={inputHandler}
      initialValue={formState.inputs.title.value}
      initialValidity={formState.inputs.title.isValid}
    />
    <Input
      id="description"
      element="textarea"
      label="Description"
      validators={[VALIDATOR_MINLENGTH(5)]}
      errorText="Please set a valid description (At least five characters)."
      onInput={inputHandler}
      initialValue={formState.inputs.description.value}
      initialValidity={formState.inputs.description.isValid}
    />
    <Button type="submit" disabled={!formState.isValid}>
      Update Place
    </Button>
  </form>
  );
};

export default UpdatePlace;
