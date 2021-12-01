import React from "react";
import StyledCard from "./StyledCard";
import { CardProps } from "./types";
import Tilt from 'react-parallax-tilt';

const Card: React.FC<CardProps> = ({ ribbon, children, ...props }) => {
  return (
    // <Tilt>
    <StyledCard {...props}>
      {ribbon}
      {children}
    </StyledCard>
    // </Tilt> 
  );
};
export default Card;
