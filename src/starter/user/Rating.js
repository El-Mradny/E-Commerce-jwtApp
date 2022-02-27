import React from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";

const Rate = ({rating,setRating}) => {
  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label key={index}>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                setRating(givenRating);
                alert(`Are you sure you want to give ${givenRating} stars ?`);
              }}
           />
            <Rating>
              <FaStar
                color={
                  givenRating < rating || givenRating === rating
                    ? "#FDCC0D"
                    : "rgb(192,192,192)"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};
  
export default Rate;