import React from "react";
import styled from "styled-components";

const HeroHeading = styled.h1`
  font-size: 10rem;
  height: 100%;
  line-height: normal;
  position: absolute;
`;
const Box = styled.div`
  height: 100%;
  position: relative;
`;

const HeroBar = styled.div`
  @keyframes slide {
    0% {
      width: 0;
      min-width: 0;
    }
    100% {
      width: 80%;
      min-width: 20rem;
    }
  }
  background: rgb(242, 147, 255);
  background: linear-gradient(
    90deg,
    rgba(242, 147, 255, 1) 0%,
    rgba(203, 179, 255, 1) 100%
  );
  border-radius: 3px;
  display: block;
  width: 80%;
  min-width: 20rem;
  position: absolute;
  animation-name: slide;
  animation-duration: 10s;
  height: 10rem;
`;

export const TitleHero = () => {
  return (
    <Box>
      <HeroBar />
      <HeroHeading>
        Klee
        <br /> Thomas
      </HeroHeading>
    </Box>
  );
};
