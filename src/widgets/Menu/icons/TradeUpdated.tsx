import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" data-name="Layer 45" height="32" id="Layer_45" viewBox="0 0 24 24" width="32"><title/><polygon points="15.643 18.357 14.229 16.943 19.186 12 14.279 7.107 15.693 5.693 22 12 15.643 18.357" fill="#4c9ae8"/><polygon points="8.357 18.357 9.771 16.943 4.814 12 9.721 7.107 8.307 5.693 2 12 8.357 18.357" fill="#4c9ae8"/></Svg>
  );
};

export default Icon;



