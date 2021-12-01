import { Colors } from "./types";

export const baseColors = {
  failure: "#ED4B9E",
  primary: "rgb(255, 42, 58)",
  primaryBright: "#880808",
  primaryDark: "#FA8072",
  secondary: "#DC143C",
  success: "#31D0AA",
  warning: "#FFB237",
};

export const brandColors = {
  binance: "#F0B90B",
};

export const lightColors: Colors = {
  ...baseColors,
  ...brandColors,
  title: "#000000",
  navBar: "rgb(39, 43, 47)",
  sideBar: "rgb(39, 43, 47)",
  background: "#FAF9FA",
  backgroundDisabled: "#E9EAEB",
  contrast: "#191326",
  invertedContrast: "#FFFFFF",
  input: "linear-gradient(to right, #4e54c8, #8f94fb)",
  tertiary: "		#A9A9A9",
  text: "#000000",
  textDisabled: "#BDC2C4",
  textSubtle: "rgb(255, 42, 58)", // "rgb(206, 206, 209)",
  textSubtleU: "rgb(206, 206, 209)",
  borderColor: "#E9EAEB",
  card: "#FFFFFF",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #E6FDFF 0%, #F3EFFF 100%)",
  },
};

export const darkColors: Colors = {
  ...baseColors,
  ...brandColors,
  title: "#FFFFFF",
  navBar: "#27262c",
  sideBar: "#27262c",
  secondary: "#9A6AFF",
  background: "#343135",
  backgroundDisabled: "#3c3742",
  contrast: "#FFFFFF",
  invertedContrast: "#191326",
  input: "#483f5a",
  primaryDark: "#0098A1",
  tertiary: "#353547",
  text: "#EAE2FC",
  textDisabled: "#666171",
  textSubtle: "#c9c4d4",
  textSubtleU: "rgb(206, 206, 209)",
  borderColor: "#524B63",
  card: "#27262c",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
  },
};
