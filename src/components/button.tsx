// import React from "react";
import styled, { css } from "styled-components";
import { HighlightColor } from "../colors";
import { Link } from "gatsby";

const shared = css`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0.5rem;
  border-radius: 0rem;
  background: var(--gradient-background);
  color: var(--text-color);
  font-size: 1rem;
  text-decoration: none;
  box-shadow: 0.1rem 0.1rem ${HighlightColor};
  width: 100%;

  transition: border-width 250ms ease, margin 250ms ease, box-shadow 250ms;
  :hover {
    box-shadow: 0.2rem 0.2rem 0.1rem ${HighlightColor};
  }
  :hover {
    animation-name: shake;
    animation-duration: 150ms;
    animation-iteration-count: infinite;
  }

  @keyframes shake {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(0.5deg);
    }
  }
`;

export const MenuItem = styled(Link)`
  ${shared}
`;

export const ExternalLinkButton = styled.a`
  ${shared}
`;
