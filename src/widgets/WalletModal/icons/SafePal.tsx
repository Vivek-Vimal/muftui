import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 96 96" {...props}>
      <image width="96" height="96" href="https://play-lh.googleusercontent.com/lw7XofgDRe1qiK_EHZxGJHNmokIjSKWfFcvtE-EdWOKZIXqCeG4ZoVbVxziUHZcf-Es" />
    </Svg>
  );
};

export default Icon;
