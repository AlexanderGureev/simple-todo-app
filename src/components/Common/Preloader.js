import React from "react";
import { HalfCircleSpinner } from "react-epic-spinners";
import { PreloaderContainer } from "./styles";

const Preloader = () => {
  return (
    <PreloaderContainer>
      <HalfCircleSpinner size={32} color="rgba(9,137,230,0.6)" />
    </PreloaderContainer>
  );
};

export default Preloader;
