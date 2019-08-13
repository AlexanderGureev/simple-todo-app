import React from "react";
import { SpringSpinner } from "react-epic-spinners";
import { LoadingContainer, ContentWrapper, LoadingIcon } from "./styles";

const LoadingPage = ({ delay = 2, ...rest }) => {
  return (
    <LoadingContainer {...rest} delay={delay}>
      <ContentWrapper>
        <LoadingIcon />
        <SpringSpinner color="#2e60bc" size={30} />
      </ContentWrapper>
    </LoadingContainer>
  );
};

export default LoadingPage;
