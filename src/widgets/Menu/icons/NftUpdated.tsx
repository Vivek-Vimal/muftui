import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg {...props} xmlns="http://www.w3.org/2000/svg" height="32px" width="32px" enable-background="new 0 0 195.3381 216" id="xing" version="1.1" viewBox="0 0 195.3381 216" ><g><polygon fill="#C1DB66" points="195.3381,0 148.6252,0 70.8516,137 68.832,140.5584 70.9181,144 114.5548,216 162.2304,216    117.1212,137.7812  "/><polygon fill="#63B473" points="73.8284,98.2892 52.3108,48 9.9316,48 31.4512,98.2892 0,156 42.3792,156 74.8244,100.6172  "/></g></Svg>
  );
};

export default Icon;

