import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

interface LogoProps extends SvgProps {
  isDark: boolean;
}

const Logo: React.FC<LogoProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <Svg viewBox="0 0 26 26" {...props}>
      <image width="26" height="26" href={isDark ? '/images/logo2.png' : '/images/logo2.png'}/>
    </Svg>
  )
};

export default Logo;
