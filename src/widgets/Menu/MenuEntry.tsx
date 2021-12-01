import styled, { keyframes, DefaultTheme } from "styled-components";
import { MENU_ENTRY_HEIGHT } from "./config";

export interface Props {
  secondary?: boolean;
  isActive?: boolean;
  theme: DefaultTheme;
}

const rainbowAnimation = keyframes`
  0%,
  100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`;

const LinkLabel = styled.div<{ isPushed: boolean }>`
  color: ${({ isPushed, theme }) => (isPushed ? theme.colors.textSubtleU : "transparent")};
  transition: color 0.4s;
  flex-grow: 1;
`;

const MenuEntry = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: ${({ secondary }) => (secondary ? "0 32px" : "0 16px")};
  font-size: ${({ secondary }) => (secondary ? "18px" : "20px")};
  // background: ${({ secondary, theme }) => (secondary ? theme.colors.background : "transparent")};
  color: ${({ theme }) => theme.colors.textSubtleU};
  background: ${({ isActive, theme }) => (isActive ? "#DC143C" : "none")};
  border-radius: 0.6rem;
  margin: 0.25rem 0;
  width: 90%;
  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  svg {
    fill: ${({ theme }) => theme.colors.textSubtleU};
  }

  &:hover {
    // background: ${({ theme }) => theme.colors.tertiary};
    border: 2px solid red;
    border-radius: 0.8rem;
    // background-color: rgba(255, 255, 255, .15);  
    // backdrop-filter: blur(2rem);
  }




  //   -webkit-transform: perspective(1px) translateZ(0);
  //   transform: perspective(1px) translateZ(0);
  //   box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  //   position: relative;
  //   overflow: hidden;
  
  // &:before {
  //   content: "";
  //   position: absolute;
  //   z-index: -1;
  //   left: 0;
  //   right: 100%;
  //   bottom: 0;
  //   background: grey;
  //   height: 3.5px;
  //   -webkit-transition-property: right;
  //   transition-property: right;
  //   -webkit-transition-duration: 0.3s;
  //   transition-duration: 0.3s;
  //   -webkit-transition-timing-function: ease-out;
  //   transition-timing-function: ease-out;
  // }
  // &:hover:before, &:focus:before, &:active:before {
  //   right: 0;
  // }




  
  //   -webkit-transform: perspective(1px) translateZ(0);
  //   transform: perspective(1px) translateZ(0);
  //   box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  //   -webkit-transition-duration: 0.3s;
  //   transition-duration: 0.3s;
  //   -webkit-transition-property: transform;
  //   transition-property: transform;
  
  // &:hover, &:focus, &:active {
  //   -webkit-transform: translateX(8px);
  //   transform: translateX(8px);
  // }






  // Safari fix
  flex-shrink: 0;

  &.rainbow {
    -webkit-background-clip: text;
    animation: ${rainbowAnimation} 3s ease-in-out infinite;
    background: ${({ theme }) => theme.colors.gradients.bubblegum};
    background-size: 200% 100%;
    font-weight: bold;
  }
`;
MenuEntry.defaultProps = {
  secondary: false,
  isActive: false,
  role: "button",
};

export { MenuEntry, LinkLabel };
