import React from "react";
import styled from "styled-components";
import { windowBreakpoint } from "../spacing";

const Box = styled.div`
  --heading-font-size: 6rem;
  position: relative;
  height: 14rem;
  width: 50%;
  @media (max-width: ${windowBreakpoint}) {
    width: 100%;
    --heading-font-size: 3rem;
    height: 9rem;
  }
`;
const HeroHeading = styled.h1`
  font-size: var(--heading-font-size);
  height: 100%;
  line-height: normal;
  position: absolute;
`;

const HeroBar = styled.div`
  font-size: var(--heading-font-size);
  @keyframes slide {
    0% {
      width: 0;
    }
    100% {
      width: 5em;
      max-width: 100%;
    }
  }
  background: rgb(242, 147, 255);
  background: var(--gradient-background);
  border-radius: 3px;
  display: block;
  width: 5em;
  max-width: 100%;
  position: absolute;
  animation-name: slide;
  animation-duration: 10s;
  height: 1.1em;
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
